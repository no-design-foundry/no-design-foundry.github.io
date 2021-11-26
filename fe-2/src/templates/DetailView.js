import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FontSizeContext,
  FormInputsContext,
  InputFontContext,
  PreviewStringsContext,
} from "../App";
import FileInput from "../components/FileInput";
import RangeInput from "../components/RangeInput";
import TextInput from "../components/TextInput";
import { useFela } from "react-fela";
import { column, width } from "../rules/rules";
import FontPreview from "../components/FontPreview";

export const DetailViewContext = createContext();

const formRule = () => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, min-content)",
  gridGap: "2px",
  whiteSpace: "nowrap",
  alignItems: "center",
  position: "absolute",
  bottom: 0,
  left: 0,
  margin: "10px"
});

const fullscreenRule = ({navHeight}) => ({
  minHeight: `calc(100vh - ${navHeight}px)`,
  display: "flex",
  flexDirection: "column"
})

let lastTimeStamp;

function DetailView(props) {
  const {
    inputs,
    variableFontControlSliders,
    fontIdentifier,
    title,
    navHeight,
  } = props;
  const { formInputValues } = useContext(FormInputsContext);
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const { inputFont } = useContext(InputFontContext);
  const { previewStrings, setPreviewString } = useContext(
    PreviewStringsContext
  );
  const [previewedString, setPreviewedString] = useState(
    previewStrings[fontIdentifier]
  );
  const [getFormVisible, setGetFormVisible] = useState(false);

  const { css } = useFela({navHeight});

  useEffect(() => {
    if (inputFont) {
      const now = Date.now();
      lastTimeStamp = now;
      setTimeout(function () {
        if (now === lastTimeStamp) {
          setPreviewedString(previewStrings[fontIdentifier]);
          console.log("send request");
        }
      }, 500);
    }
  }, [formInputValues, inputFont, previewStrings, fontIdentifier]);

  return (
    <DetailViewContext.Provider value={{ fontIdentifier }}>
      <div className={css(fullscreenRule)}>
        <FontPreview fontSize={fontSize}>
          {previewStrings[fontIdentifier]}
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
            defaultValue={previewStrings[fontIdentifier]}
            onChange={(value) => setPreviewString(fontIdentifier, value)}
          ></TextInput>
          <FileInput label="font file"></FileInput>
          {inputs.map((input, index) => {
            switch (input.type) {
              case "range":
                return (
                  <RangeInput
                    label={input.label}
                    name={input.name}
                    key={`input_${fontIdentifier}_${index}`}
                    min={input.min}
                    max={input.max}
                  ></RangeInput>
                );
              default:
                throw new Error("component not found");
            }
          })}
          <button
            className={css(column(5))}
            onClick={() => setGetFormVisible(true)}
          >
            get
          </button>
          {getFormVisible && (
            <>
              <hr className={css(column("1 / span 5"), width("100%"))} />
              <TextInput label={"font name"} />
            </>
          )}
        </div>
      </div>
    </DetailViewContext.Provider>
  );
}

export default DetailView;
