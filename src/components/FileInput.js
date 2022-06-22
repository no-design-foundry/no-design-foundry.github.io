import React, { useState } from 'react'
import { useFela } from 'react-fela'

const inputWrapperRule = () => ({
  position : "relative"
})

const puppetRule = () => ({
  top: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "20ch",
  height: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "block"
})

const masterRule = () => ({
  opacity: 0,
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
})

function FileInput(props) {
  const {required = false} = props
  const [file, setFile] = useState()
  const {css} = useFela()
  function handleOnInput(e) {
    if(e.target.files.length === 1) {
      setFile(e.target.files[0])
    }
    else {
      setFile(null)
    }
  }
  return (
    <>
    <label>font</label>
    <span className={css(inputWrapperRule)}>
      <button className={css(puppetRule)}>
        {file?.name ?? "Upload a font"}
      </button>
      <input className={css(masterRule
        )} onInput={handleOnInput} name="font_file" type="file" required={required}></input>
    </span>
    </>
  )
}

export default FileInput