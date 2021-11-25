import React, { useContext, useRef, useEffect } from "react";
import { InputFontContext } from "../App";

function FileInput(props) {
  const { label } = props;
  const fileInputRef = useRef();
  const { inputFont, setInputFont } = useContext(InputFontContext);

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
    <div>
      <label>{label}</label>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleOnChange}
        style={{ display: "none" }}
      ></input>
      <button onClick={handleOnClick}>
        {inputFont?.name ?? "select file"}
      </button>
    </div>
  );
}

export default FileInput;
