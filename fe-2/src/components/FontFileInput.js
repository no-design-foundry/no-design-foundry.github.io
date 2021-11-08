import React, { useState, useRef, useContext, useEffect } from "react";
import { useFela } from "react-fela";
import { Context } from "../App";
import { inputValidityRule, labelValidityRule } from "../rules/form";

const wrapperRule = () => ({
  position: "relative"
});

const inputRule = () => ({
    opacity: 0,
    height: "100%",
    width: "100%",
    position: "absolute",

})


function FontFileInput(props) {
  const inputRef = useRef();
  const { inputFont, setInputFont } = useContext(Context);
  const [isValid, setIsValid] = useState(false)
  const { css } = useFela({isValid});

  function handleOnChange() {
    setIsValid(inputRef.current.checkValidity())
    if (inputRef.current.files.length > 0) {
      setInputFont(inputRef.current.files);
    }
  }

  useEffect(() => {
    inputRef.current.files = inputFont
    setIsValid(inputRef.current.checkValidity())
  }, [])

  return (
    <>
      <label className={css(labelValidityRule)}>font file</label>
      <div className={css(wrapperRule, inputValidityRule)}>
        <input
          className={css(inputRule)}
          ref={inputRef}
          type="file"
          name="font_file"
          accept=".otf, .ttf"
          onChange={handleOnChange}
          required={true}
        ></input>
        <span>{inputFont ? inputFont[0].name : "select file"}</span>
      </div>
    </>
  );
}

export default FontFileInput;
