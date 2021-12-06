import skia
import contextlib
from datetime import datetime
from io import BytesIO


    # displayImage(data=image.encodeToData())
with open("test_fonts/VTT.ttf", "rb") as input_file:
    data = BytesIO(input_file.read())

start = datetime.now()
font = skia.Typeface.MakeFromData(data)
print(dir(font))
end = datetime.now()
print((end-start).total_seconds())