import React, { useState, useRef, useContext, useEffect } from "react";
import { useFela } from "react-fela";
import { Context } from "../App";

const rule = ({ props }) => ({
  position: "relative",
  "& > input": {
    opacity: 0,
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});

function FontFileInput(props) {
  const { css } = useFela();
  const inputRef = useRef();
  const { inputFont, setInputFont } = useContext(Context);

  function handleOnChange() {
    if (inputRef.current.files.length > 0) {
      setInputFont(inputRef.current.files);
    }
  }

  useEffect(() => {
    inputRef.current.files = inputFont
  }, [])

  return (
    <>
      <label>font file</label>
      <div className={css(rule)}>
        <input
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
