import React, { createContext, useState, useEffect, useRef } from "react";
import { useFela } from "react-fela";
import { filterRoutes } from "./App";

export const FormInputsContext = createContext();
export const InputFontContext = createContext();
export const PreviewStringsContext = createContext();
export const PreviewedInputFontContext = createContext();
export const PreviewedOutputFontsContext = createContext();
export const FontVariationsContext = createContext();
export const FontPreviewMarginsContext = createContext();
export const FontPreviewsContext = createContext();
export const SetCursorFileDrag = createContext();

const fontPreviewOpacityTransition = 350;
const dragIndicationTransition = 100;

const dropItRule = ({dragIndicationVisible}) => ({
  zIndex: 1000,
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: "#eee",
  transition: `opacity ${dragIndicationTransition}ms ease-in`,
  opacity: dragIndicationVisible ? 1 : 0
})

const dropItTitleRule = () => ({
  position: "absolute",
  whiteSpace: "nowrap",
  fontSize: "50px"
})

function Contexts(props) {
  const [inputFont, setInputFont] = useState(null);
  const [previewedInputFont, setPreviewedInputFont] = useState(null);
  // const [cursorFileDrag, setCursorFileDrag] = useState(false);
  const [fontPreviewMargins, _setFontPreviewMargins] = useState({
    marginBottom: 0,
    marginTop: 0,
  });
  const [dragIndicationVisible, setDragIndicationVisible] = useState(false)
  const [dragIndication, setDragIndication] = useState(false)
  const dropIndicationRef = useRef()
  
  const fontPreviews = useRef([]);

  useEffect(() => {
    if (dragIndication) {
      setDragIndicationVisible(true)
    }
  }, [dragIndication])

  useEffect(() => {
    if (!dragIndicationVisible) {
      setTimeout(() => {
        setDragIndication(false)
      }, dragIndicationTransition)
    }
  }, [dragIndicationVisible])
  
  function setCursorFileDrag(value) {
    if (value) {
      setDragIndication(true)
      dropIndicationRef.current.style.left = value.left + "px"
      dropIndicationRef.current.style.top = value.top + "px"
    }
    else {
      setDragIndicationVisible(false)
    }
  }


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

  const { css } = useFela({dragIndicationVisible});

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
                    <SetCursorFileDrag.Provider value={setCursorFileDrag}>
                      {dragIndication ? (
                        <div className={css(dropItRule)}>
                          <div ref={dropIndicationRef} className={css(dropItTitleRule)}>
                            Drop it!
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {props.children}
                    </SetCursorFileDrag.Provider>
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
