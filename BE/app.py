import uvicorn
from functools import wraps
from extractor.formats.opentype import (
    extractGlyphOrder,
    extractOpenTypeInfo,
    extractOpenTypeKerning,
    extractOpenTypeGlyphs
)
from fontTools.cffLib import PrivateDict
from fastapi.responses import StreamingResponse, Response
from fastapi import FastAPI, Form, File, Depends, Body, Request
from typing import Any, Optional
from fastapi.middleware.cors import CORSMiddleware
from fontTools.ttLib import TTFont
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.t2CharStringPen import T2CharStringPen
from io import BytesIO
from tools.generic import (
    get_components_in_subsetted_text,
    fonts_to_base64,
    extract_to_ufo,
    inject_features
)
import extractor
from defcon import Font
from datetime import datetime
import random

from filters.rasterizer.rasterizer import rasterize
from filters.rotorizer.rotorizer_4 import rotorize


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

def get_tt_font(bytes_):
    bytes_ = BytesIO(bytes_)
    bytes_.seek(0)
    font = TTFont(bytes_, lazy=True)
    return font

def subset_font(tt_font, subsetted_text):
    
    subsetter = Subsetter()
    # keep_glyphs = get_components_in_subsetted_text(tt_font, subsetted_text)
    # subsetter.populate(text=subsetted_text, glyphs=keep_glyphs)
    subsetter.populate(text=subsetted_text)
    subsetter.subset(tt_font)

def timer(func):
    @wraps(func)
    async def temp_func(*args, **kwargs):
        start = datetime.now()
        response = func(*args, **kwargs)
        end = datetime.now()
        print((end - start).total_seconds())
        return response
    return temp_func

def extractGlyph(source, destination, glyph_name):
    # grab the cmap
    vmtx = source.get("vmtx")
    vorg = source.get("VORG")
    is_ttf = "glyf" in source
    reversedMapping = source.get("cmap").buildReversed()
    # grab the glyphs
    glyphSet = source.getGlyphSet()
    sourceGlyph = glyphSet[glyph_name]
    # make the new glyph
    destinationGlyph = destination.newGlyph(glyph_name)
    # outlines
    if is_ttf:
        pen = destinationGlyph.getPointPen()
        sourceGlyph.drawPoints(pen)
    else:
        pen = destinationGlyph.getPen()
        sourceGlyph.draw(pen)
    # width
    destinationGlyph.width = sourceGlyph.width
    # height and vertical origin
    if vmtx is not None and glyph_name in vmtx.metrics:
        destinationGlyph.height = vmtx[glyph_name][0]
        if vorg is not None:
            if glyph_name in vorg.VOriginRecords:
                destinationGlyph.verticalOrigin = vorg[glyph_name]
            else:
                destinationGlyph.verticalOrigin = vorg.defaultVertOriginY
        else:
            tsb = vmtx[glyph_name][1]
            bounds_pen = ControlBoundsPen(glyphSet)
            sourceGlyph.draw(bounds_pen)
            if bounds_pen.bounds is not None:
                xMin, yMin, xMax, yMax = bounds_pen.bounds
                destinationGlyph.verticalOrigin = tsb + yMax
    # unicodes
    destinationGlyph.unicodes = reversedMapping.get(glyph_name, [])

@app.post("/filters/{filter_identifier}")
async def filter(
    filter_identifier: str,
    font_file: bytes = File(...),
    preview_string: str = Form(..., max_length=32),
    depth: int= Form(None),
    resolution: int = Form(None)
):
    start = datetime.now()

    binary_font = BytesIO(font_file)
    tt_font = TTFont(binary_font, lazy=True)
    unicodes = [ord(character) for character in preview_string]
    cmap = {k:v for k,v in tt_font.getBestCmap().items() if k in unicodes}
    reversed_cmap  = {v:k for k,v in cmap.items()}
    glyph_names_to_process, unicodes = zip(*set([(cmap.get(unicode_), unicode_) for unicode_ in unicodes]))
    print(get_components_in_subsetted_text(tt_font, glyph_names_to_process))

    if filter_identifier in ["rasterizer"]:
        ufo = Font()
        extractOpenTypeInfo(tt_font, ufo)
        for glyph_name, unicode_ in zip(glyph_names_to_process, unicodes):
            new_glyph = ufo.newGlyph(glyph_name)
            new_glyph.unicode = unicode_
    else:
        ufo = None

    # if filter_identifier == "rotorizer":
    #     for glyph_name in glyph_names_to_process:
    #         extractGlyph(tt_font, ufo, glyph_name)
    if filter_identifier == "rasterizer":
        output = [rasterize(ufo=ufo, tt_font=tt_font, binary_font=binary_font, glyph_names_to_process=glyph_names_to_process, resolution=resolution)]
    elif filter_identifier == "rotorizer":
        output = rotorize(tt_font=tt_font, depth=depth, glyph_names_to_process=glyph_names_to_process, unicodes=unicodes, cmap=cmap)
    else:
        raise Exception
    end = datetime.now()
    total = (end-start).total_seconds()
    response = fonts_to_base64(output)
    return {"fonts": response, "response_time": total}

@app.get("/filters/{filter_identifier}/get")
def filter_get():
    with open("../fe/public/rastr.ttf", "rb") as input_file:
        response = input_file.read()
    return Response(
        content=response,
        media_type="font/opentype",
        headers={'Content-Disposition': 'inline; filename="test.ttf"'}
        )

@app.post("/debug/{filter_identifier}")
def filter_get(
    filter_identifier: str,
    font_file: bytes = File(...),
    preview_string: str = Form(..., max_length=32),
    depth: int= Form(None),
    resolution: int = Form(None)
    ):
        print(depth, resolution)
        return {"message": "ok"}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, debug=True, reload=True)
