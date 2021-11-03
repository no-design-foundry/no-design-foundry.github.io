import uvicorn
from fastapi import FastAPI, Form, File, Depends, Body
from typing import Any
from fastapi.middleware.cors import CORSMiddleware

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



@app.post("/filters/rotorizer")
async def rotorizer(
    font_file: bytes = File(...),
    preview_string: str = Form(...),
    depth: int = Form(...)
):
    if not ((depth >= 2) and (depth <= 300)):
        return {"message": "error"}
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000, debug=True)
