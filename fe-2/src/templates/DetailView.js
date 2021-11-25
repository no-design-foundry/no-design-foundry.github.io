import React, { createContext, useContext, useEffect, useState } from "react";
import { useFela } from "react-fela";
import {
  FontSizeContext,
  FormInputsContext,
  InputFontContext,
  PreviewStringsContext,
} from "../App";
import FileInput from "../components/FileInput";
import RangeInput from "../components/RangeInput";
import TextInput from "../components/TextInput";
export const DetailViewContext = createContext();

let lastTimeStamp;

function DetailView(props) {
  const { inputs, variableFontControlSliders, fontIdentifier, title } = props;
  const { formInputValues } = useContext(FormInputsContext);
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const { inputFont } = useContext(InputFontContext);
  const { previewStrings, setPreviewString } = useContext(
    PreviewStringsContext
  );
  const [previewedString, setPreviewedString] = useState(
    previewStrings[fontIdentifier]
  );

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
  }, [formInputValues, inputFont, previewStrings]);

  return (
    <DetailViewContext.Provider value={{ fontIdentifier }}>
      <div style={{fontSize: `${fontSize}px`}}>{previewedString}</div>
      <div>
        {variableFontControlSliders?.map((input, index) => (
          <RangeInput
            label={input.label}
            key={`font_ui_${index}`}
            min={input.min}
            max={input.max}
            defaultValue={input.default}
          />
        ))}
        <RangeInput label={"font size"} min={20} max={400} defaultValue={200} onChange={(e) => setFontSize(e.target.value)}/>
        <TextInput
          label={"preview"}
          defaultValue={title}
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
      </div>
    </DetailViewContext.Provider>
  );
}

export default DetailView;
