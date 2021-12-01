from fontTools.ttLib import TTFont

tt_font = TTFont("test_fonts/sourceSerif.otf")
print(dir(tt_font))
for byte in tt_font.getTableData("GPOS"):
    print(byte)
# print(tt_font["GPOS"])