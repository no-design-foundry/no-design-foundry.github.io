import React, { useContext, useRef, useEffect } from "react";
import { useFela } from "react-fela";
import { InputFontContext } from "../App";
import { column } from "../rules/rules";

function FileInput(props) {
  const { label } = props;
  const fileInputRef = useRef();
  const { inputFont, setInputFont } = useContext(InputFontContext);
  const {css} = useFela()

  function handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    if(e.dataTransfer?.files.length === 1) {
      setInputFont(e.dataTransfer.files[0])
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
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);
    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  function handleOnChange(e) {
    if (e.target.files.length === 1) {
      setInputFont(e.target.files[0]);
    }
  }

  function handleOnClick(e) {
    fileInputRef.current.click();
  }
  return (
    <>
      <label className={css(column(1))}>{label}</label>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleOnChange}
        style={{ display: "none" }}
      ></input>
      <button className={css(column(3))} onClick={handleOnClick}>
        {inputFont?.name ?? "select file"}
      </button>
    </>
  );
}

export default FileInput;
