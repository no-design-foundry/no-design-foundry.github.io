import React, { useContext, useRef, useState } from "react";
import FilterInfoContext from "../contexts/FilterContext";
import Slider from "./Slider";
import TextInput from "./TextInput";
import FontControls from "./FontControls";
import { useFela } from "react-fela";
import FileInput from "./FileInput";
import { urls } from "../variables";
import axios from "axios";
import OutputFontContext from "../contexts/OutputFontContext";

const formRule = () => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, min-content)",
  gridAutoRows: "min-content",
  position: "fixed",
  bottom: "5px",
  gridGap: "0px 1ch",
  alignItems: "center",
  "& > label": {
    whiteSpace: "nowrap",
  },
  // "& > input": {
  //   height: "1em"
  // }
});

const downloadRule = () => ({
  marginTop: "1em",
  gridColumn: 2,
});

let lastTimeStamp;
function Form() {
  const { identifier, title, inputs } = useContext(FilterInfoContext);
  const formRef = useRef();
  const { setOutputFonts } = useContext(OutputFontContext);
  const [processing, setProcessing] = useState(false);
  const { css } = useFela();
  function handleOnChange(e) {
    if (formRef.current.checkValidity() && e.target.name?.length) {
      console.log(e.target.name)
      const now = Date.now();
      lastTimeStamp = now;
      setTimeout(function () {
        if (now === lastTimeStamp) {
          const data = new FormData(formRef.current);
          const inputFontFile = formRef.current.font_file.files[0];
          const url = urls.preview(identifier);
          setProcessing(true);
          axios
            .post(url, data, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              const outputFontsArrays = response.data.fonts.map((fontBase64) =>
                Uint8Array.from(atob(fontBase64), (c) => c.charCodeAt(0))
              );
              return Promise.all([
                inputFontFile.arrayBuffer(),
                outputFontsArrays,
              ]);
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
              // document.fonts.add(inputFont);
              outputFonts.forEach((outputFont) =>
                document.fonts.add(outputFont)
              );
              setOutputFonts(identifier, outputFonts.map((font) => font.family))
            })
            .catch((response) => console.log(response))
            .finally(setProcessing(false));
        }
      }, 500);
    }
  }
  return (
    <form ref={formRef} className={css(formRule)} onChange={handleOnChange}>
      {processing && <div>processing...</div>}
      <FontControls></FontControls>
      {inputs.map((input, index) => {
        const { type, ...kwargs } = input;
        return (
          <Slider key={`${identifier}-${index}`} {...kwargs} required={true} />
        );
      })}
      <FileInput required={true} />
      <TextInput
        key={identifier}
        {...{
          label: "preview",
          name: "preview_string",
          defaultValue: title,
          required: true,
        }}
      />
      <button className={css(downloadRule)}>download</button>
    </form>
  );
}

export default Form;
