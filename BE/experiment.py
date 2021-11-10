from datetime import datetime

# from ufoLib2.objects.font import Font
from fontTools.ttLib import TTFont
# from io import BytesIO



tt_font = TTFont("fe-2/public/sourceSerif.otf")

tt_font["CFF2"].cff[0].decompileAllCharStrings()
# print(dir(tt_font["CFF2"].cff[0].CharStrings.charStrings))
print(dir(tt_font["CFF2"].cff[0].CharStrings["F"]))
print(tt_font["CFF2"].cff[0].CharStrings["F"].program)


