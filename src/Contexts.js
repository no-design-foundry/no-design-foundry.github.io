import React, { createContext, useState, useEffect, useRef } from "react";
// import opentype from "opentype.js";

import { filterRoutes } from "./App";
import { fontPreviewOpacityTransition } from "./components/FontPreview";

export const FormInputsContext = createContext();
export const InputFontContext = createContext();
export const PreviewStringsContext = createContext();
export const PreviewedInputFontContext = createContext();
export const PreviewedOutputFontsContext = createContext();
export const FontVariationsContext = createContext();
export const FontPreviewMarginsContext = createContext();
export const FontPreviewsContext = createContext();

function Contexts(props) {
  const [inputFont, setInputFont] = useState(null);
  const [previewedInputFont, setPreviewedInputFont] = useState(null);
  const [fontPreviewMargins, _setFontPreviewMargins] = useState({
    marginBottom: 0,
    marginTop: 0,
  });
  const fontPreviews = useRef([])

  function setFontPreviewMargins(margins) {
    setTimeout(() => {
      _setFontPreviewMargins(margins);
    }, fontPreviewOpacityTransition);
  }

  const [previewedOutputFonts, _setPreviewedOutputFonts] = useState(
    filterRoutes.reduce((collector, filterRoute) => {
      collector[filterRoute.filterIdentifier] = Array(
        filterRoute.numberOfLayers
      );
      return collector;
    }, {})
  );

  const [previewStrings, _setPreviewString] = useState(
    filterRoutes.reduce((collector, filterRoute) => {
      collector[filterRoute.filterIdentifier] = filterRoute.title;
      return collector;
    }, {})
  );

  const [formInputValues, _setFormInputsValue] = useState(
    filterRoutes.reduce((collector, filterRoute) => {
      collector[filterRoute.filterIdentifier] = [
        ...filterRoute.inputs,
        ...(filterRoute?.variableFontControlSliders ?? []),
      ].reduce(
        (inputCollector, input) => {
          inputCollector[input.name] = input.default;
          return inputCollector;
        },
        { fontSize: null }
      );
      return collector;
    }, {})
  );

  const [fontVariations, _setFontVariations] = useState(
    filterRoutes.reduce((collector, filterRoute) => {
      if (filterRoute.variableFontControlSliders) {
        collector[filterRoute.filterIdentifier] =
          filterRoute.variableFontControlSliders.reduce((collector, slider) => {
            collector[slider.tag] = slider.default;
            return collector;
          }, {});
      }
      return collector;
    }, {})
  );

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      // setTimeout(()=>{
      //   inputFont
      //     .arrayBuffer()
      //     .then((data) => opentype.parse(data))
      //     .then((font) => font.tables.os2)
      //     .then((os2) => {
      //       const { sCapHeight, sTypoLineGap, usWinDescent, usWinAscent } = os2;
      //       const marginBottom = -usWinDescent / usWinAscent;
      //       const marginTop = sTypoLineGap !== 0 ? sCapHeight / usWinAscent - 1 : 0;
      //       setFontPreviewMargins({ marginBottom, marginTop });
      //     });
      // }, fontPreviewOpacityTransition)
    }
  }, [inputFont]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  function setPreviewedOutputFonts(filterIdentifier, value) {
    let collector = {};
    collector[filterIdentifier] = value;
    _setPreviewedOutputFonts({ ...previewedOutputFonts, ...collector });
  }

  function setFontVariations(filterIdentifier, tag, value) {
    let collector = { ...fontVariations };
    collector[filterIdentifier][tag] = parseInt(value);
    _setFontVariations(collector);
  }

  function setFormInputValue(filterIdentifier, name, value) {
    let collector = { ...formInputValues };
    collector[filterIdentifier][name] = value;
    _setFormInputsValue(collector);
  }
  function setPreviewString(filterIdentifier, value) {
    let collector = { ...previewStrings };
    collector[filterIdentifier] = value;
    _setPreviewString(collector);
  }

  return (
    <PreviewStringsContext.Provider
      value={{ previewStrings, setPreviewString }}
    >
      <PreviewedOutputFontsContext.Provider
        value={{ previewedOutputFonts, setPreviewedOutputFonts }}
      >
        <FontVariationsContext.Provider
          value={{ fontVariations, setFontVariations }}
        >
          <FormInputsContext.Provider
            value={{ formInputValues, setFormInputValue }}
          >
            <InputFontContext.Provider value={{ inputFont, setInputFont }}>
              <PreviewedInputFontContext.Provider
                value={{ previewedInputFont, setPreviewedInputFont }}
              >
                <FontPreviewMarginsContext.Provider
                  value={{ fontPreviewMargins, setFontPreviewMargins }}
                >
                  <FontPreviewsContext.Provider value={fontPreviews}>
                    {props.children}
                  </FontPreviewsContext.Provider>
                </FontPreviewMarginsContext.Provider>
              </PreviewedInputFontContext.Provider>
            </InputFontContext.Provider>
          </FormInputsContext.Provider>
        </FontVariationsContext.Provider>
      </PreviewedOutputFontsContext.Provider>
    </PreviewStringsContext.Provider>
  );
}

export default Contexts;
