import React, { useState, useRef } from "react"
import { useFela } from "react-fela"

const rule = ({ props }) => ({
  position: "relative",
  "& > input": {
    opacity: 0,
    height: "100%",
    width: "100%",
    position: "absolute",
  }
})

function FontFileInput(props) {
  const {title} = props
  const { css } = useFela()
  const inputRef = useRef()
  const [currentFile, setCurrentFile] = useState(null)

  function handleOnChange(e) {
    if (inputRef.current.files[0]?.name) {
      setCurrentFile(inputRef.current.files[0].name)
    } else {
      setCurrentFile(null)
    }
  }

  return (
    <>
      <label>{title}</label>
      <div className={css(rule)}>
        <input
          ref={inputRef}
          type="file"
          name="font_file"
          accept=".otf, .ttf"
          onChange={handleOnChange}
          required={true}
        ></input>
        <span>{currentFile ? currentFile : "select file"}</span>
      </div>
    </>
  )
}

export default FontFileInput
