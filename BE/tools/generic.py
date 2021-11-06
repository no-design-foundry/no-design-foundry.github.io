import base64
from itertools import chain
from fontTools.ttLib import TTFont
import defcon

from extractor.formats.opentype import (
    extractGlyphOrder,
    extractOpenTypeInfo,
    extractOpenTypeKerning,
    extractOpenTypeGlyphs,
    # extractUnicodeVariationSequences,
    # extractInstructions
)


def fonts_to_base64(fonts):
    return [base64.b64encode(font.getvalue()).decode('ascii') for font in fonts]

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


def extract_to_ufo(tt_font):
    assert isinstance(tt_font, TTFont), "tt_font must be an instance of TTFont"
    ufo = defcon.Font()
    extract_OTF(tt_font, ufo)
    return ufo

def extract_OTF(source, destination):
    # extractUnicodeVariationSequences(source, destination) # don't know what this is
    extractOpenTypeGlyphs(source, destination)