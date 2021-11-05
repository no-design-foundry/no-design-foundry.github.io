import React, { useRef, useState } from "react"
import FontInputSlider from "./FontInputSlider"
import axios from "axios"
import FontFileInput from "./FontFileInput"
import TextInput from "./TextInput"
import { useFela } from "react-fela"
import formRule from "../rules/formRule"
import Style from "./Style"



function FontInputForm(props) {
  const {css} = useFela()
  const { inputs, fontIdentifier, title, setPreviewedString } = props
  const [fontString, setFontString] = useState("")
  const formRef = useRef()
  var lastTimeStamp = 0

  function sendRequest() {
    const formData = new FormData(formRef.current)
    axios({
      method: "post",
      url: `http://0.0.0.0:5000/filters/${fontIdentifier}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(response => {
      const fontStrings_ = response.data.fonts
      const fontString_ = fontStrings_[0]
      setFontString(fontString_)
      console.log(setPreviewedString)
      setPreviewedString(formData.get("preview_string"))

    })
    .catch(error => console.log(error))
  }

  function handleOnChange(e) {
    setTimeout(() => {
      if (e.timeStamp - lastTimeStamp === 0) {
        if (formRef.current.checkValidity()) {
          sendRequest()
          lastTimeStamp = e.timeStamp
        }
      }
    }, 500)
    lastTimeStamp = e.timeStamp
  }

  return (
    <>
    {fontString.length > 0 && <Style>{fontString}</Style>}
    <form ref={formRef} className={css(formRule)} onChange={handleOnChange}>
      {props.children}
      <FontFileInput title="font file"/>
      <TextInput title="preview string" name="preview_string" defaultValue={title}></TextInput>
      {inputs.map(input => {
        switch (input.type) {
          case "slider":
            return <FontInputSlider {...input} />
        }
      })}
    </form>
    </>
  )
}

export default FontInputForm
