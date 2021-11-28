import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FontSizeContext,
  FormInputsContext,
  InputFontContext,
  PreviewedInputFontContext,
  PreviewedOutputFontsContext,
  PreviewStringsContext,
} from "../App";
import FileInput from "../components/FileInput";
import RangeInput from "../components/RangeInput";
import TextInput from "../components/TextInput";
import { useFela } from "react-fela";
import { column, width } from "../rules/rules";
import FontPreview from "../components/FontPreview";
import axios from "axios";

export const DetailViewContext = createContext();

const formRule = () => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, min-content)",
  gridGap: "2px 6px",
  whiteSpace: "nowrap",
  alignItems: "center",
  position: "absolute",
  bottom: 0,
  left: 0,
  margin: "10px",
});

const fullscreenRule = ({ navHeight }) => ({
  minHeight: `calc(100vh - ${navHeight}px)`,
  display: "flex",
  flexDirection: "column",
});

const isProcessingWrapperRule = () => ({
  display: "flex",
  alignItems: "flex-end",
  flexDirection: "row"
});

const isProcessingRule = ({isProcessing}) => ({
  display: "block",
  animationName: {
    "0%": { paddingBottom: ".5em" },
    "40%": { paddingBottom: "0" },
    "100%": { paddingBottom: "0"}
  },
  animationDuration: "1s",
  animationIterationCount: "infinite",
  animationDirection: "alternate-reverse",
  animationPlayState: isProcessing ? "processing" : "paused"
});

const CancelToken = axios.CancelToken;
let cancel;
let lastTimeStamp;

function DetailView(props) {
  const {
    inputs,
    variableFontControlSliders,
    filterIdentifier,
    navHeight,
  } = props;
  const { previewedInputFont, setPreviewedInputFont } = useContext(
    PreviewedInputFontContext
  );

  const { setPreviewedOutputFonts } = useContext(PreviewedOutputFontsContext);
  const { formInputValues } = useContext(FormInputsContext);
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const { inputFont } = useContext(InputFontContext);
  const { previewStrings, setPreviewString } = useContext(
    PreviewStringsContext
  );
  const [previewedString, setPreviewedString] = useState(
    previewStrings[filterIdentifier]
  );
  const [getFormVisible, setGetFormVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { css } = useFela({ navHeight, isProcessing });

  function cancelRequest() {
    if (cancel !== undefined) {
      cancel("cancelled by user");
      cancel = undefined;
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
        cancel = c;
      }),
      url: `http://0.0.0.0:5000/filters/${filterIdentifier}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
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
              `preview-input-font-${Date.now()}-${index}`,
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
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  useEffect(() => {
    if (inputFont) {
      const now = Date.now();
      lastTimeStamp = now;
      setTimeout(function () {
        if (now === lastTimeStamp) {
          // setPreviewedString();
          setPreviewString(filterIdentifier, previewedString)
          sendRequest();
        }
      }, 500);
    }
  }, [formInputValues, inputFont, previewedString, filterIdentifier]);

  useEffect(() => {
    return () => {
      setGetFormVisible(false);
      // cancelRequest()
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <DetailViewContext.Provider value={{ filterIdentifier }}>
      <div className={css(fullscreenRule)}>
        <FontPreview fontFamily={previewedInputFont} fontSize={fontSize}>
          {previewStrings[filterIdentifier]}
        </FontPreview>
        <div className={css(formRule)}>
          {isProcessing && (
            <div className={css(isProcessingWrapperRule, column("1 / span 5"))}>
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
              defaultValue={input.default}
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
            className={css(column(5))}
            onClick={() => setGetFormVisible(!getFormVisible)}
            disabled={!Boolean(inputFont)}
          >
            {getFormVisible ? "hide" : "get"}
          </button>
          <button onClick={() => cancelRequest()}>cancel</button>
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
    </DetailViewContext.Provider>
  );
}

export default DetailView;
