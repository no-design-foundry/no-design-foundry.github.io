import React, { useContext, useRef, useEffect, useState } from "react";
import { useFela } from "react-fela";
import { InputFontContext } from "../App";
import { column } from "../rules/rules";

const fullscreenDragRule = ({ fileIsDragged }) => ({
  position: "fixed",
  pointerEvents: "none",
  top: 0,
  extend: [
    {
      condition: false,
      style: {
        background: "#0f0",
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
  ],
});

function FileInput(props) {
  const { label } = props;
  const fileInputRef = useRef();
  const { inputFont, setInputFont } = useContext(InputFontContext);
  const [fileIsDragged, setFileIsDragged] = useState(false);
  const { css } = useFela({ fileIsDragged });

  useEffect(() => {
    if (fileIsDragged) {
      // document.body.style.pointerEvents = "none"
    }
    else {
      // document.body.style.removeProperty("pointer-events")
    }
  }, [fileIsDragged])

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files.length === 1) {
      setInputFont(e.dataTransfer.files[0]);
    }
    setFileIsDragged(false);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setFileIsDragged(true);
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setFileIsDragged(false);
  }
  
  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleOnChange(e) {
    if (e.target.files.length === 1) {
      setInputFont(e.target.files[0]);
    }
  }

  function handleOnClick(e) {
    fileInputRef.current.click();
  }

  useEffect(() => {
    document.body.addEventListener("dragenter", handleDragEnter);
    document.body.addEventListener("dragleave", handleDragLeave);
    document.body.addEventListener("dragover", handleDragOver);
    document.body.addEventListener("drop", handleDrop);
    return () => {
      document.body.removeEventListener("dragleave", handleDragLeave);
      document.body.removeEventListener("dragenter", handleDragEnter);
      document.body.removeEventListener("dragover", handleDragOver);
      document.body.removeEventListener("drop", handleDrop);
    };
  }, []);
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
      <div className={css(fullscreenDragRule)}>Hello</div>
    </>
  );
}

export default FileInput;
