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
import { fadeInDuration } from "../rules/variables";
import GetFontButton from "./GetFontButton";

export const formRule = () => ({
  display: "grid",
  width: "500px",
  gridTemplateColumns: "1fr auto auto 3ch",
  gridAutoRows: "1.5em",
  alignItems: "center",
  gap: "0px 10px",
});

let lastTimeStamp;

function FontInputForm(props) {
  const { inputs, fontIdentifier, route, setFadingOut } = props;
  const { previewStrings, setPreviewStrings, inputFont } = useContext(Context);
  const { showPreviewFont, setShowPreviewFont } = useContext(DetailViewContext);
  const { css } = useFela();
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
        setFadingOut(true);
        setTimeout(() => {
          const arrayBuffer = formData.get("font_file").arrayBuffer();
          arrayBuffer
            .then((array) => new FontFace("preview-input-font", array))
            .then((inputFont) => {
              document.fonts.add(inputFont);
              setShowPreviewFont(true);
              setFontStrings(response.data.fonts);
              setFadingOut(false);
              let value = {};
              value[fontIdentifier] = formData.get("preview_string");
              setPreviewStrings({ ...previewStrings, ...value });
            });
        }, fadeInDuration + 100);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (formRef.current.checkValidity()) {
      setFormIsValid(true);
      sendRequest();
    }
    return () => {
    };
  }, []);

  function handleOnSubmit(e) {
    e.preventDefault()
    console.log(e)
    if (formRef.current.checkValidity()) {
      setFormIsValid(true)
      lastTimeStamp = e.timeStamp + 500
      sendRequest()
    }
    else {
      setFormIsValid(false)
    }
  }

  function handleOnChange(e) {
    if (e.target.name.length > 0) {
      if (formRef.current.checkValidity()) {
        setFormIsValid(true)
        lastTimeStamp = e.timeStamp;
        setTimeout(function () {
          if (e.timeStamp === lastTimeStamp || e.target.type === "file") {
            sendRequest();
          }
        }, 500);
      } else {
        setFormIsValid(false);
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
        onSubmit={handleOnSubmit}
      >
        {props.children}
        <FontFileInput />
        <TextInput
          title="preview string"
          name="preview_string"
          defaultValue={previewStrings[fontIdentifier]}
          disabled={!formIsValid}
        ></TextInput>
        {inputs.map((input, index) => {
          switch (input.type) {
            case "slider":
              return (
                <RangeInput
                  key={`${route}_form_${index}`}
                  {...input}
                  disabled={!formIsValid}
                />
              );
            default:
              throw new Error("type not found");
          }
        })}
      </form>
    </>
  );
}

export default FontInputForm;
