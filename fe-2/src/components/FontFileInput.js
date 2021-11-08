import React, { useState, useRef, useContext, useEffect } from "react";
import { useFela } from "react-fela";
import { Context } from "../App";
import { inputRule, labelRule, labelValidityRule } from "../rules/form";
import { flex } from "../rules/generic";
import { insetShadow } from "../rules/variables";


const wrapperRule = () => ({
  position: "relative"
});

const fileInputRule = () => ({
  opacity: 0,
  height: "100%",
  width: "100%",
  position: "absolute",
})

const fileInputIconRule = () => ({
  background: "silver",
  padding: "0 .5em",
  borderRadius: "1em",
  ...insetShadow
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
    <div className={css(flex)}>
      <label className={css(labelValidityRule, labelRule)}>font file</label>
      <div className={css(wrapperRule, inputRule)}>
        <input
          className={css(fileInputRule)}
          ref={inputRef}
          type="file"
          name="font_file"
          accept=".otf, .ttf"
          onChange={handleOnChange}
          required={true}
        ></input>
        <span className={css(fileInputIconRule)}>{inputFont ? inputFont[0].name : "select file"}</span>
      </div>
    </div>
  );
}

export default FontFileInput;
