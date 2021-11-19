import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import FontFileInput from "./FontFileInput";
import TextInput from "./TextInput";
import { useFela } from "react-fela";
import Style from "./Style";
import { DetailViewContext } from "../templates/FilterDetailView";
import { Context } from "../App";
import RangeInput from "./RangeInput";
import { padding } from "../rules/generic";

export const formRule = () => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  display: "grid",
  width: "500px",
  gridTemplateColumns: "1fr auto auto 3ch",
  gridAutoRows: "1.2em",
  gap: "0px 10px",
});

let lastTimeStamp;

function FontInputForm(props) {
  const { previewStrings, setPreviewStrings } = useContext(Context);
  const {showPreviewFont, setShowPreviewFont } = useContext(DetailViewContext);
  const { css } = useFela();
  const { inputs, fontIdentifier, route } = props;
  const [fontStrings, setFontStrings] = useState("");
  const formRef = useRef();

  function sendRequest() {
    const formData = new FormData(formRef.current);

    axios({
      method: "post",
      url: `http://0.0.0.0:5000/filters/${fontIdentifier}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        setFontStrings(response.data.fonts);
        let value = {};
        value[fontIdentifier] = formData.get("preview_string");
        setPreviewStrings({ ...previewStrings, ...value });
        return formData.get("font_file").arrayBuffer();
      })
      .then((fontData) => new FontFace("preview-input-font", fontData))
      .then((font) => {
        document.fonts.add(font);
        console.log(showPreviewFont)
        setShowPreviewFont(true);
        console.log(showPreviewFont)
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (formRef.current.checkValidity()) {
      sendRequest();
    }
  }, []);

  function handleOnChange(e) {
    if (e.target.name.length > 0) {
      lastTimeStamp = e.timeStamp;
      setTimeout(function () {
        if (e.timeStamp === lastTimeStamp) {
          if (formRef.current.checkValidity()) {
            sendRequest();
          }
        }
      }, 500)
    }
  }

  return (
    <>
      {fontStrings.length > 0 &&
        fontStrings.map((fontString, index) => (
          <Style key={index} index={index}>{fontString}</Style>
        ))}
      <form
        ref={formRef}
        className={css(formRule, padding("10px"))}
        onChange={handleOnChange}
      >
        {props.children}
        <FontFileInput />
        <TextInput
          title="preview string"
          name="preview_string"
          defaultValue={previewStrings[fontIdentifier]}
        ></TextInput>
        {inputs.map((input, index) => {
          switch (input.type) {
            case "slider":
              return <RangeInput key={`${route}_form_${index}`} {...input} />;
            default:
              throw new Error("type not found");
          }
        })}
      </form>
    </>
  );
}

export default FontInputForm;
