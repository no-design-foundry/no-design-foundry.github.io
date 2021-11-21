from fontTools.ttLib import TTFont
from fontTools.cffLib import PrivateDict
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.pointPen import SegmentToPointPen
from fontTools.pens.t2CharStringPen import T2CharStringPen
from datetime import datetime
from defcon.objects.glyph import Glyph
from fontTools.subset import Subsetter
from datetime import datetime
from io import BytesIO
from fontTools.pens.ttGlyphPen import TTGlyphPen
from ufo2ft import compileTTF
import uharfbuzz as hb

from defcon import Font

from fontTools.ttLib.tables._g_l_y_f import table__g_l_y_f, Glyph as TTGlyph, GlyphCoordinates
from extractor.formats.opentype import (
    extractGlyphOrder,
    extractOpenTypeInfo,
    extractOpenTypeKerning,
    extractOpenTypeGlyphs,
)
import freetype

output = BytesIO()
tt_font = TTFont("fe/public/sourceSerif.otf")
print(dir(tt_font))
# tt_font = TTFont("fe/public/rastr.ttf")
tt_font.save(output)
output.seek(0)

start = datetime.now()


fontfile = "fe/public/sourceSerif.otf"
# fontfile = "fe/public/rastr.ttf"
text = "LoV"

blob = hb.Blob.from_file_path(fontfile)
face = hb.Face(blob)
font = hb.Font(face)

buf = hb.Buffer()
buf.add_str(text)
buf.guess_segment_properties()

features = {"kern": True, "liga": True, "gpos": True, "GPOS": True}
hb.shape(font, buf, features)

infos = buf.glyph_infos
positions = buf.glyph_positions

for info, pos in zip(infos, positions):
    gid = info.codepoint
    cluster = info.cluster
    x_advance = pos.x_advance
    x_offset = pos.x_offset
    y_offset = pos.y_offset
    print(pos.position)
    print(f"gid{gid}={cluster}@{x_advance},{x_offset}+{y_offset}")


# print(tt_font.getGlyphOrder().index("V"))


end = datetime.now()

print((end - start).total_seconds())

# tt_font["glyf"] = table__g_l_y_f()

# tt_pen = TTGlyphPen([])
# tt_pen.moveTo((0, 0))
# tt_pen.lineTo((200, 100))
# tt_pen.lineTo((300, 20))
# tt_pen.closePath()
# # tt_pen.endPath()

# tt_font["a"] = tt_pen.glyph()

# tt_font.save("experiment.ttf")
