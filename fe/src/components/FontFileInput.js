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

const buttonRule = () => ({
  height: "1.5em"
})

function FontFileInput(props) {
  const {disabled} = props
  const inputRef = useRef();
  const { inputFont, setInputFont } = useContext(Context);

  const [isValid, setIsValid] = useState(false);
  const { css } = useFela({ isValid });

  function handleOnChange(e) {
    setIsValid(inputRef.current.checkValidity());
    if (inputRef.current.files.length === 1) {
      setInputFont(inputRef.current.files[0]);
    }
    else {
      setInputFont(null)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    if(e.dataTransfer?.files.length === 1) {
      setInputFont(e.dataTransfer.files)
    }
  }

  function handleDragEnter(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDragLeave(e) {
    e.preventDefault()
    e.stopPropagation()
  }
  
  function handleDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    setIsValid(inputRef.current.checkValidity());
    window.addEventListener('dragenter', handleDragEnter)
    window.addEventListener('dragleave', handleDragLeave)
    window.addEventListener('dragover', handleDragOver)
    window.addEventListener('drop', handleDrop)
    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
      window.removeEventListener('dragleave', handleDragLeave)
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('drop', handleDrop)
    }
  }, []);

  return (
    <>
      <label className={css(labelValidityRule, labelRule)} htmlFor="font_file">font file</label>
      <div className={css(inputRule, relative)}>
        <input
          className={css(fileInputRule)}
          size={Math.pow(2, 20)*10}
          ref={inputRef}
          type="file"
          name="font_file"
          accept=".otf, .ttf, .woff, .woff2"
          onChange={handleOnChange}
          required={true}
          disabled={disabled}
        ></input>
        <button role="button" className={css(buttonRule)}>
          {inputFont ? inputFont.name : "select font"}
        </button>
      </div>
    </>
  );
}

export default FontFileInput;
