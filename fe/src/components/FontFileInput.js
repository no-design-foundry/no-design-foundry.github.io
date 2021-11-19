import React, { useState, useRef, useContext, useEffect } from "react";
import { useFela } from "react-fela";
import { Context } from "../App";
import { inputRule, labelRule, labelValidityRule } from "../rules/form";
import { relative } from "../rules/generic";
import { ValidityContext } from "./FontInputForm";

const fileInputRule = () => ({
  opacity: 0,
  position: "absolute",
});

function FontFileInput(props) {
  const {disabled} = props
  const inputRef = useRef();
  const { inputFont, setInputFont } = useContext(Context);

  const [isValid, setIsValid] = useState(false);
  const { css } = useFela({ isValid });

  function handleOnChange() {
    setIsValid(inputRef.current.checkValidity());
    if (inputRef.current.files.length > 0) {
      setInputFont(inputRef.current.files);
    }
  }

  useEffect(() => {
    inputRef.current.files = inputFont;
    setIsValid(inputRef.current.checkValidity());
  }, []);

  return (
    <>
      <label className={css(labelValidityRule, labelRule)} htmlFor="font_file">font file</label>
      <div className={css(inputRule, relative)}>
        <input
          className={css(fileInputRule)}
          ref={inputRef}
          type="file"
          name="font_file"
          accept=".otf, .ttf"
          onChange={handleOnChange}
          required={true}
          disabled={disabled}
        ></input>
        <span role="button">
          {inputFont ? inputFont[0].name : "Select font"}
        </span>
      </div>
    </>
  );
}

export default FontFileInput;
