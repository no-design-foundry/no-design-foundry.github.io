from itertools import chain

def get_components_in_subsetted_text(tt_font, text):
    if "glyf" in tt_font:
        def get_component_names(glyf, glyph_names, collector=[]):
            components = list(chain(*[glyf[glyph_name].getComponentNames(glyf) for glyph_name in glyph_names]))
            if components:
                collector += components
                return get_component_names(glyf, components, collector)
            else:
                return collector
        glyf = tt_font["glyf"]
        components = []
        cmap = tt_font.getBestCmap()
        keep_glyphs = map(lambda keep_character:cmap.get(ord(keep_character)), text)
        keep_glyphs = filter(lambda glyph_name:False if glyph_name is None else True, keep_glyphs)
        return get_component_names(glyf, list(keep_glyphs))
    else:
        return ()

from fontTools.ttLib.ttFont import TTFont

font = TTFont("test_fonts/verdana.ttf")
# print(font["glyf"]["aacute"].getComponentNames(font["glyf"]))
print(get_components_in_subsetted_text(font, "č"))