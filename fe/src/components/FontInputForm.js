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
  const { showPreviewFont, setShowPreviewFont } = useContext(DetailViewContext);
  const { css } = useFela();
  const { inputs, fontIdentifier, route } = props;
  const [fontStrings, setFontStrings] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
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
        setShowPreviewFont(true);
      })
      .catch((error) => console.error(error));
  }

  function handleDragOver() {
    console.log("dragged over")
  }

  function handleDrop(e) {
    e.stopPropagation()
    e.preventDefault()
    console.log("dropped")
  }

  useEffect(() => {
    window.addEventListener("dragover", handleDragOver)
    window.addEventListener("drop", handleDrop)
    if (formRef.current.checkValidity()) {
      setFormIsValid(true)
      sendRequest();
    }
    return () => {
      window.removeEventListener("dragover", handleDragOver)
      window.removeEventListener("drop", handleDrop)  
    }
  }, []);

  function handleOnChange(e) {
    if (e.target.name.length > 0) {
      if (formRef.current.checkValidity()) {
        if (formIsValid !== true) {
          setFormIsValid(true)
        }
        lastTimeStamp = e.timeStamp;
        setTimeout(function () {
          if (e.timeStamp === lastTimeStamp) {
            sendRequest();
          }
        }, 500);
      }
      else {
        if (formIsValid !== false) {
          setFormIsValid(false)
        }    
      }
    }
  }

  return (
    <>
      {fontStrings.length > 0 &&
        fontStrings.map((fontString, index) => (
          <Style key={index} index={index}>
            {fontString}
          </Style>
        ))}
      <form
        ref={formRef}
        className={css(formRule, padding("10px"))}
        onChange={handleOnChange}
      >
        {props.children}
        <FontFileInput/>
        <TextInput
          title="preview string"
          name="preview_string"
          defaultValue={previewStrings[fontIdentifier]}
          disabled={!formIsValid}
        ></TextInput>
        {inputs.map((input, index) => {
          switch (input.type) {
            case "slider":
              return <RangeInput key={`${route}_form_${index}`} {...input} disabled={!formIsValid}/>;
            default:
              throw new Error("type not found");
          }
        })}
      </form>
    </>
  );
}

export default FontInputForm;
