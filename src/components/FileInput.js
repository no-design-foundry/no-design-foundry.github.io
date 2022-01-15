import React, { useContext, useRef, useEffect, useState } from "react";
import { useFela } from "react-fela";
import { InputFontContext } from "../Contexts";
import { column } from "../rules/rules";

const fullscreenDragRule = ({ fileIsDragged }) => ({
  position: "fixed",
  fontSize: "4em",
  top: 0,
  backgroundColor: "#fff",
  opacity: 1,
  left: 0,
  right: 0,
  bottom: 0,
});


const draggedRule = () => ({
  position: "absolute",
  // transform: "translate(-50%, -50%)"
});

const dropItRule = () => ({
  display: ["none", "inline"],
});

const buttonRule = () => ({
  whiteSpace: "no-wrap"
});

function FileInput(props) {
  const { label } = props;
  const fileInputRef = useRef();
  const dragState = useRef();
  const [cursorDrag, setCursorDrag] = useState({});
  const { inputFont, setInputFont } = useContext(InputFontContext);
  const [fileIsDragged, setFileIsDragged] = useState(false);
  const { css } = useFela({ fileIsDragged });

  useEffect(() => {
    if (fileIsDragged) {
      document.body.querySelector("#root").style.pointerEvents = "none";
      dragState.current = "moving";
    } else {
      document.body
        .querySelector("#root")
        .style.removeProperty("pointer-events");
    }
  }, [fileIsDragged]);

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files.length === 1) {
      setInputFont(e.dataTransfer.files[0]);
      dragState.current = null;
    }
    setFileIsDragged(false);
  }

  function handleDragEnter(e) {
    dragState.current = "entered";
    e.preventDefault();
    e.stopPropagation();
    setFileIsDragged(true);
  }

  function handleDragLeave(e) {
    if (dragState.current === "moving") {
      e.preventDefault();
      e.stopPropagation();
      setFileIsDragged(false);
      dragState.current = "left";
    }
  }

  function handleDragOver(e) {
    const { clientX: left, clientY: top } = e;
    setCursorDrag({ left, top });
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
        accept=".ttf,.otf,woff,woff2"
      ></input>
      <button className={css(column(3), buttonRule)} onClick={handleOnClick}>
        <span>{inputFont?.name ?? "select file"}</span>{!inputFont?.name && <span className={css(dropItRule)}> or drop it</span>}
      </button>
      {/* <span className={css(dropItRule, column("4 / span 2"))}> or drop it</span> */}
      {fileIsDragged && (
        <div className={css(fullscreenDragRule)}>
          <span className={css(draggedRule)} style={cursorDrag}>
            Drop it
          </span>
        </div>
      )}
    </>
  );
}

export default FileInput;
