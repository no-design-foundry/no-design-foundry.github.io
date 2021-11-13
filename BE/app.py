import uvicorn

from fastapi import FastAPI, Form, File, Depends, Body, Request
from typing import Any, Optional
from fastapi.middleware.cors import CORSMiddleware
from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter
from io import BytesIO
from tools.generic import (
    get_components_in_subsetted_text,
    fonts_to_base64,
    extract_to_ufo,
    inject_features
)
import extractor
import defcon
from datetime import datetime

from filters.rasterizer.rasterizer import rasterize
from filters.rotorizer.rotorizer import rotorize


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
    font = TTFont(bytes_)
    return font

def subset_font(tt_font, subsetted_text):
    subsetter = Subsetter()
    keep_glyphs = get_components_in_subsetted_text(tt_font, subsetted_text)
    subsetter.populate(text=subsetted_text, glyphs=keep_glyphs)
    subsetter.subset(tt_font)

@app.post("/filters/{filter_identifier}")
async def filter(
    filter_identifier: str,
    font_file: bytes = File(...),
    preview_string: str = Form(..., max_length=32),
    depth: int= Form(None),
    resolution: int = Form(None)
):
    start = datetime.now()
    tt_font = get_tt_font(font_file)
    gpos = tt_font["GPOS"]
    subset_font(tt_font, preview_string)
    output = BytesIO()
    tt_font.save(output)
    ufo = defcon.Font() if ("CFF " in tt_font or "CFF2" in tt_font) else None
    if filter_identifier == "rasterizer":
        response_fonts = [rasterize(tt_font=tt_font, ufo=ufo, resolution=resolution)]
    elif filter_identifier == "rotorizer":
        response_fonts = rotorize(tt_font=tt_font, depth=depth)
    for response_font in response_fonts:
        # print(dir(response_font["GPOS"]))
        inject_features(tt_font, response_font)
        response_font["GPOS"] = gpos
    # for font in response_fonts:
    #     print(tt_font.keys())
    response = fonts_to_base64(response_fonts)
    end = datetime.now()
    print((end - start).total_seconds())
    # except Exception as e:
    #     return {"message": "wrong"}
    return {"fonts": response}


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, debug=True, reload=True)
