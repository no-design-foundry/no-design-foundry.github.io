import React, { useContext, useRef, useState } from "react"
import FontInputSlider from "./FontInputSlider"
import axios from "axios"
import FontFileInput from "./FontFileInput"
import TextInput from "./TextInput"
import { useFela } from "react-fela"
import formRule from "../rules/formRule"
import Style from "./Style"
import { Context } from "../templates/Page"

function FontInputForm(props) {
  const { css } = useFela()
  const { inputs, fontIdentifier, title, setPreviewedString } = props
  const [fontString, setFontString] = useState("")
  const { showPreviewFont, setShowPreviewFont } = useContext(Context)
  const formRef = useRef()
  var lastTimeStamp = 0


  function sendRequest() {
    const formData = new FormData(formRef.current)
    axios({
      method: "post",
      url: `http://0.0.0.0:5000/filters/${fontIdentifier}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(response => {
        const fontStrings_ = response.data.fonts
        const fontString_ = fontStrings_[0]
        setFontString(fontString_)
        setPreviewedString(formData.get("preview_string"))
        return formData.get("font_file").arrayBuffer()
      })
      .then(fontData => new FontFace("preview-input-font", fontData))
      .then(font => {
        document.fonts.add(font)
        setShowPreviewFont(true)
      })
      .catch(error => console.error(error))
  }

  function handleOnChange(e) {
    setTimeout(() => {
      const timeStamp = new Date()
      if (timeStamp - lastTimeStamp >= 500) {
        if (formRef.current.checkValidity()) {
          sendRequest()
          lastTimeStamp = new Date()
        }
      }
    }, 500)
    lastTimeStamp = new Date()
  }

  return (
    <>
      {fontString.length > 0 && <Style>{fontString}</Style>}
      <form ref={formRef} className={css(formRule)} onChange={handleOnChange}>
        {props.children}
        <FontFileInput title="font file" />
        <TextInput
          title="preview string"
          name="preview_string"
          defaultValue={title}
        ></TextInput>
        {inputs.map((input, index) => {
          switch (input.type) {
            case "slider":
              return <FontInputSlider key={`FormInput_${index}`} {...input} />
            default:
              throw new Error("type not found")
          }
        })}
      </form>
    </>
  )
}

export default FontInputForm
