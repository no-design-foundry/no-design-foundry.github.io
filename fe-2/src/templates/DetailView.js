import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FontSizeContext,
  FormInputsContext,
  InputFontContext,
  PreviewedInputFontContext,
  PreviewedOutputFontsContext,
  PreviewStringsContext,
  FontVariationsContext,
} from "../App";
import FileInput from "../components/FileInput";
import RangeInput from "../components/RangeInput";
import TextInput from "../components/TextInput";
import { useFela } from "react-fela";
import { column, width } from "../rules/rules";
import FontPreview from "../components/FontPreview";
import axios from "axios";

export const DetailViewContext = createContext();

const formWrapperRule = () => ({
  marginTop: "auto",
});
const formRule = () => ({
  display: "grid",
  gridTemplateColumns: [
    "min-content min-content auto 3ch",
    "repeat(4, min-content) 3ch",
  ],
  width: ["100%", "auto"],
  gap: "0px 6px",
  gridAutoRows: "1.2em",
  whiteSpace: "nowrap",
  alignItems: "center",
  bottom: 0,
  left: 0,
  // "& > *": {
  //   padding: "1px 3px"
  // }
  // padding: "10px",
});

const fullscreenRule = ({ navHeight }) => ({
  minHeight: `calc(100vh - ${navHeight}px)`,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "10px",
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
  const { inputs, variableFontControlSliders, filterIdentifier, navHeight } =
    props;
  const { previewedInputFont, setPreviewedInputFont } = useContext(
    PreviewedInputFontContext
  );

  const { setPreviewedOutputFonts } = useContext(PreviewedOutputFontsContext);
  const { formInputValues } = useContext(FormInputsContext);
  const { fontSize, setFontSize } = useContext(FontSizeContext);
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
  const { css } = useFela({ navHeight, isProcessing });

  function cancelRequest() {
    if (cancel.current !== undefined) {
      setIsProcessing(false);
      cancel.current("cancelled by user");
      cancel.current = undefined;
    }
  }

  function sendRequest() {
    const formData = new FormData();
    formData.append("font_file", inputFont);
    formData.append("preview_string", previewedString);
    Object.keys(formInputValues[filterIdentifier]).forEach((key) =>
      formData.append(key, formInputValues[filterIdentifier][key])
    );
    setIsProcessing(true);
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
        console.log(response.data.response_time);
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
        // console.log(inputFont, outputFonts)
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

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      setGetFormVisible(false);
      cancelRequest();
    };
  }, []);

  return (
    <DetailViewContext.Provider value={{ filterIdentifier }}>
      <div className={css(fullscreenRule)}>
        <FontPreview fontFamily={previewedInputFont} fontSize={fontSize}>
          {previewStrings[filterIdentifier]}
        </FontPreview>
        <div className={css(formWrapperRule)}>
          <div className={css(formRule)}>
            {isProcessing && (
              <div
                className={css(isProcessingWrapperRule, column("1 / span 5"))}
              >
                {[..."loading..........."].map((letter, index) => (
                  <span
                    key={`loading-${index}`}
                    className={css(isProcessingRule, () => ({
                      animationDelay: `${index / 10}s`,
                    }))}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            )}
            {variableFontControlSliders?.map((input, index) => (
              <RangeInput
                label={input.label}
                key={`font_ui_${index}`}
                min={input.min}
                max={input.max}
                tag={input.tag}
                defaultValue={fontVariations[filterIdentifier][input.tag]}
                onChange={(e) =>
                  setFontVariations(filterIdentifier, input.tag, e.target.value)
                }
                animatable={true}
              />
            ))}
            <RangeInput
              label={"font size"}
              min={20}
              max={400}
              defaultValue={200}
              onChange={(e) => setFontSize(e.target.value)}
            />
            <TextInput
              label={"preview"}
              defaultValue={previewStrings[filterIdentifier]}
              onChange={(value) => setPreviewedString(value)}
              disabled={!Boolean(inputFont)}
            ></TextInput>
            <FileInput label="font file"></FileInput>
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
                      disabled={!Boolean(inputFont)}
                    ></RangeInput>
                  );
                default:
                  throw new Error("component not found");
              }
            })}
            <button
              className={css(column(1))}
              onClick={() => setGetFormVisible(!getFormVisible)}
              disabled={!Boolean(inputFont)}
            >
              {getFormVisible ? "hide" : "get"}
            </button>
            {/* <button onClick={() => cancelRequest()}>cancel</button> */}
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
