import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FontSizeContext,
  FormInputsContext,
  InputFontContext,
  PreviewedInputFontContext,
  PreviewStringsContext,
} from "../App";
import FileInput from "../components/FileInput";
import RangeInput from "../components/RangeInput";
import TextInput from "../components/TextInput";
import { useFela } from "react-fela";
import axios from "axios";
import { column, width } from "../rules/rules";
import FontPreview from "../components/FontPreview";
import { useLocation } from "react-router";

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
  // zIndex: -1,
  minHeight: `calc(100vh - ${navHeight}px)`,
  display: "flex",
  flexDirection: "column",
});

let lastTimeStamp;

function DetailView(props) {
  const {
    inputs,
    variableFontControlSliders,
    filterIdentifier,
    title,
    navHeight,
  } = props;
  const { previewedInputFont, setPreviewedInputFont } = useContext(
    PreviewedInputFontContext
  );
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

  const { css } = useFela({ navHeight });
  function sendRequest() {
    const formData = new FormData();
    formData.append("font_file", inputFont);
    formData.append("preview_string", previewedString);
    Object.keys(formInputValues[filterIdentifier]).forEach((key) =>
      formData.append(key, formInputValues[filterIdentifier][key])
    );

    axios({
      method: "post",
      url: `http://0.0.0.0:5000/filters/${filterIdentifier}`,
      // url: `http://0.0.0.0:5000/debug/${filterIdentifier}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        // console.log(atob(response.data.fonts[0]))
        const outputNameFont = `preview-font-output-${Date.now()}`
        fetch(
          `data:font/truetype;charset=utf-8;base64,${response.data.fonts[0]}`
        )
        .then((res) => res.blob())
        .then((blob) => blob.arrayBuffer())
        .then(arrayBuffer => new FontFace(outputNameFont, arrayBuffer))
        .then(outputFont => {
          document.fonts.add(outputFont)
          // setPreviewedInputFont(outputNameFont);

        }
          )

        console.log(outputNameFont)

        const fontName = `preview-font-input-${Date.now()}`;
        inputFont.arrayBuffer()
          .then((array) => new FontFace(fontName, array))
          .then((inputFont) => {
            document.fonts.add(inputFont);
            setPreviewedInputFont(fontName);
            let value = {};
            value[filterIdentifier] = formData.get("preview_string");
          });
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (inputFont) {
      const now = Date.now();
      lastTimeStamp = now;
      setTimeout(function () {
        if (now === lastTimeStamp) {
          setPreviewedString(previewStrings[filterIdentifier]);
          sendRequest();
        }
      }, 500);
    }
  }, [formInputValues, inputFont, previewStrings, filterIdentifier]);

  useEffect(() => {
    return () => {
      setGetFormVisible(false);
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
            onChange={(value) => setPreviewString(filterIdentifier, value)}
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
            // disabled={!Boolean(inputFont)}
          >
            {getFormVisible ? "hide" : "get"}
          </button>
          {getFormVisible && (
            <>
              <hr className={css(column("1 / span 5"), width("100%"))} />
              <TextInput label={"font name"} />
              <button className={css(column("5"))}> download </button>
              <TextInput label={"email"} />
              <button className={css(column("5"))}> send </button>
            </>
          )}
        </div>
      </div>
    </DetailViewContext.Provider>
  );
}

export default DetailView;
