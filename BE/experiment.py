from fontTools.ttLib import TTFont
from fontTools.cffLib import PrivateDict
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.pointPen import SegmentToPointPen
from fontTools.pens.t2CharStringPen import T2CharStringPen
from datetime import datetime
from defcon.objects.glyph import Glyph


font = TTFont("sourceSerif.otf")
cff2 = font["CFF2"]

if hasattr(cff2, "desubroutinize"):
    print(cff2.desubroutinize())


content = cff2.cff[cff2.cff.keys()[0]]
letter = content.CharStrings["A"]

glyph = Glyph()
pen = glyph.getPen()
letter.draw(pen)
go = cff2.getGlyphOrder()
cff_pen = T2CharStringPen(None, go, CFF2=True)
glyph.draw(cff_pen)

private = content.CharStrings["A"].private
content.CharStrings["O"] = cff_pen.getCharString(private=private)


font.save("output.otf")