import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FormInputsContext,
  InputFontContext,
  PreviewedInputFontContext,
  PreviewedOutputFontsContext,
  PreviewStringsContext,
  FontVariationsContext,
  FontPreviewMarginsContext,
  FontPreviewsContext,
} from "../Contexts";
import FileInput from "../components/FileInput";
import RangeInput from "../components/RangeInput";
import TextInput from "../components/TextInput";
import { useFela } from "react-fela";
import { column, width } from "../rules/rules";
import FontPreview from "../components/FontPreview";
import axios from "axios";
import Log from "../components/Log";
import { dictToFontVariationSettings } from "../misc";

export const DetailViewContext = createContext();

const getRule = () => ({
  textAlign: "right",
});

const formWrapperRule = ({ innerHeight }) => ({
  bottom: 0,
  position: "fixed",
  transform: "translateZ(0)",
  flexDirection: "column",
  display: "flex",
  justifyContent: "flex-end",
  transition: "height .05s ease-in",
});
const formRule = () => ({
  pointerEvents: "all",
  display: "grid",
  gridTemplateColumns: ["auto auto 3ch auto", "repeat(4, min-content) 3ch"],
  width: ["calc(100% - 10px)", "auto"],
  gap: "0px 6px",
  gridAutoRows: "1.2em",
  whiteSpace: "nowrap",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "10px",
});

const fullscreenRule = () => ({
  minHeight: `100%`,
  top: 0,
  position: "absolute",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  pointerEvents: "none",
  overflow: "hidden",
});

const isProcessingWrapperRule = () => ({
  display: "flex",
  alignItems: "flex-end",
  flexDirection: "row",
});

const isProcessingRule = ({ isProcessing }) => ({
  display: "block",
  animationName: {
    "0%": { paddingBottom: ".5em" },
    "40%": { paddingBottom: "0" },
    "100%": { paddingBottom: "0" },
  },
  animationDuration: "1s",
  animationIterationCount: "infinite",
  animationDirection: "alternate-reverse",
  animationPlayState: isProcessing ? "processing" : "paused",
});

const CancelToken = axios.CancelToken;
let lastTimeStamp;

function DetailView(props) {
  const {
    inputs,
    variableFontControlSliders,
    filterIdentifier,
    fontSize,
    setFontSize
  } = props;
  const { previewedInputFont, setPreviewedInputFont } = useContext(
    PreviewedInputFontContext
  );
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const formRef = useRef();
  const previousDistance = useRef(null);
  const [logContent, setLogContent] = useState([]);
  const { setPreviewedOutputFonts } = useContext(PreviewedOutputFontsContext);
  const { formInputValues } = useContext(FormInputsContext);
  const { inputFont } = useContext(InputFontContext);
  const isMounted = useRef(false);
  const cancel = useRef(undefined);
  const { previewStrings, setPreviewString } = useContext(
    PreviewStringsContext
  );
  const [previewedString, setPreviewedString] = useState(
    previewStrings[filterIdentifier]
  );
  const [getFormVisible, setGetFormVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { fontVariations, setFontVariations } = useContext(
    FontVariationsContext
  );
  const { setFontPreviewMargins } = useContext(FontPreviewMarginsContext);
  const { css } = useFela({ isProcessing, innerHeight });
  const fontPreviews = useContext(FontPreviewsContext);

  function cancelRequest() {
    if (cancel.current !== undefined) {
      setIsProcessing(false);
      cancel.current("cancelled by user");
      cancel.current = undefined;
    }
  }

  // useEffect(() => {
  //   fontPreviews.current.forEach(fontPreview => fontPreview.style.fontSize = fontSize + "px")
  // }, [fontSize]);
  

  function sendRequest() {
    const formData = new FormData();
    formData.append("font_file", inputFont);
    formData.append("preview_string", previewedString);
    Object.keys(formInputValues[filterIdentifier]).forEach((key) =>
      formData.append(key, formInputValues[filterIdentifier][key])
    );
    setIsProcessing(true);
    let margins = {};
    axios({
      method: "post",
      cancelToken: new CancelToken(function executor(c) {
        cancel.current = c;
      }),
      url: `http://0.0.0.0:5000/filters/${filterIdentifier}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        setLogContent(response.data.warnings);
        if (response.data.margins) {
          margins = response.data.margins;
        }
        const outputFontsArrays = response.data.fonts.map((fontBase64) =>
          Uint8Array.from(atob(fontBase64), (c) => c.charCodeAt(0))
        );
        return Promise.all([inputFont.arrayBuffer(), outputFontsArrays]);
      })
      .then(([inputFontBuffer, outputFontsArrays]) => [
        new FontFace(`preview-input-font-${Date.now()}`, inputFontBuffer),
        outputFontsArrays.map(
          (outputFontArray, index) =>
            new FontFace(
              `preview-output-font-${Date.now()}-${index}`,
              outputFontArray
            )
        ),
      ])
      .then(([inputFont, outputFonts]) => {
        document.fonts.add(inputFont);
        outputFonts.map((outputFont) => document.fonts.add(outputFont));
        return [inputFont, outputFonts];
      })
      .then(([inputFont, outputFonts]) => {
        setPreviewedInputFont(inputFont.family);
        setPreviewedOutputFonts(
          filterIdentifier,
          outputFonts.map((outputFont) => outputFont.family)
        );
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log(thrown.message);
        } else {
          console.log(thrown);
        }
      })
      .finally(() => {
        setIsProcessing(false);
        setFontPreviewMargins(margins);
      });
  }

  // form auto-submit
  useEffect(() => {
    if (isMounted.current && inputFont) {
      const now = Date.now();
      lastTimeStamp = now;
      setTimeout(function () {
        if (now === lastTimeStamp) {
          setPreviewString(filterIdentifier, previewedString);
          sendRequest();
        }
      }, 500);
    }
  }, [formInputValues, inputFont, previewedString, filterIdentifier]);

  function handleOnTouchMove(e) {
    // switch (e.touches.length) {
    //   case 2:
    //     const [{ pageX: x1, pageY: y1 }, { pageX: x2, pageY: y2 }] = e.touches;
    //     const distance = Math.hypot(y2 - y1, x2 - x1) * 2;
    //     if (previousDistance.current) {
    //       const value =
    //         fontSizeRef.current - (previousDistance.current - distance);
    //       if (value > 20) {
    //         setFontSize(value);
    //         fontSizeRef.current = value;
    //       }
    //     }
    //     previousDistance.current = distance;
    //     break;
    // }
  }

  function handleOnTouchEnd(e) {
    previousDistance.current = null;
  }

  function handleOnResize(e) {
    setInnerHeight(window.innerHeight);
  }

  useEffect(() => {
    // new ResizeObserver(()=>{document.body.clientHeight}).observe(document.body)
    isMounted.current = true;
    document.body.style.touchAction = "none";
    window.addEventListener("resize", handleOnResize);
    window.addEventListener("touchmove", handleOnTouchMove);
    window.addEventListener("touchend", handleOnTouchEnd);
    return () => {
      window.removeEventListener("resize", handleOnResize);
      window.removeEventListener("touchmove", handleOnTouchMove);
      window.removeEventListener("touchend", handleOnTouchEnd);
      document.body.style.removeProperty("touch-action");
      isMounted.current = false;
      setGetFormVisible(false);
      cancelRequest();
      fontPreviews.current = [];
    };
  }, []);

  return (
    <DetailViewContext.Provider value={{ filterIdentifier }}>
      <div className={css(fullscreenRule)}>
        <FontPreview fontFamily={previewedInputFont} fontSize={fontSize}>
          {previewStrings[filterIdentifier]}
        </FontPreview>
        <div className={css(formWrapperRule)}>
          {isProcessing && (
            <div className={css(isProcessingWrapperRule)}>
              {[..."processing..........."].map((letter, index) => (
                <span
                  key={`processing-${index}`}
                  className={css(isProcessingRule, () => ({
                    animationDelay: `${index / 10}s`,
                  }))}
                >
                  {letter}
                </span>
              ))}
            </div>
          )}
          <Log content={logContent} />
          <div ref={formRef} className={css(formRule)}>
            {variableFontControlSliders?.map((input, index) => (
              <RangeInput
                label={input.label}
                key={`font_ui_${index}`}
                min={input.min}
                max={input.max}
                tag={input.tag}
                value={fontVariations[filterIdentifier][input.tag]}
                onChange={(value) => {
                  // setFontVariations(filterIdentifier, input.tag, value);
                  fontPreviews.current.forEach(
                    fontPreview =>
                      fontPreview.style.fontVariationSettings = dictToFontVariationSettings({ RTTX: value })
                      // fontPreview.style.fontVariationSettings = "'RTTX' 50"
                  );
                }}
                // animatable={true}
              />
            ))}
            <RangeInput
              label={"font size"}
              min={20}
              max={1000}
              value={fontSize}
              onChange={(value) =>
                fontPreviews.current.forEach(
                  (fontPreview) => (fontPreview.style.fontSize = value + "px")
                )
              }
            />
            <FileInput label="font file"></FileInput>
            <TextInput
              label={"preview"}
              value={previewStrings[filterIdentifier]}
              onChange={(value) => setPreviewedString(value)}
              disabled={!Boolean(inputFont)}
            ></TextInput>
            {inputs.map((input, index) => {
              switch (input.type) {
                case "range":
                  return (
                    <RangeInput
                      label={input.label}
                      name={input.name}
                      key={`input_${filterIdentifier}_${index}`}
                      min={input.min}
                      max={input.max}
                      value={formInputValues[filterIdentifier][input.name]}
                      disabled={!Boolean(inputFont)}
                    ></RangeInput>
                  );
                default:
                  throw new Error("component not found");
              }
            })}
            <button
              className={css(column(4), getRule)}
              onClick={() => setGetFormVisible(!getFormVisible)}
              disabled={!Boolean(inputFont)}
            >
              {getFormVisible ? "hide" : "get"}
            </button>
            {getFormVisible && (
              <>
                <hr className={css(column("1 / span 5"), width("100%"))} />
                <TextInput label={"font name"} />
                <button className={css(column("5"))}>download</button>
                <TextInput label={"email"} />
                <button className={css(column("5"))}>send</button>
              </>
            )}
          </div>
        </div>
      </div>
    </DetailViewContext.Provider>
  );
}

export default DetailView;
