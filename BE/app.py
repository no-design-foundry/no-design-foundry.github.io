import uvicorn

from fastapi import FastAPI, Form, File, Depends, Body
from typing import Any
from fastapi.middleware.cors import CORSMiddleware
from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter
from io import BytesIO
from tools.generic import (
    get_components_in_subsetted_text,
    fonts_to_base64
)


app = FastAPI()

origins = [
    "http://localhost:8000",
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


@app.post("/filters/rotorizer")
async def rotorizer(
    font_file: bytes = File(...),
    preview_string: str = Form(...),
    depth: int = Form(...)
):
    try:
        if not ((depth >= 2) and (depth <= 300)):
            return {"message": "error"}
        tt_font = get_tt_font(font_file)
        subset_font(tt_font, preview_string)
        output = BytesIO()
        tt_font.save(output)
        response = fonts_to_base64([output])
    except Exception as e:
        print(e)
        return {"message": "wrong"}
    return {"fonts": response}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000, debug=True)
