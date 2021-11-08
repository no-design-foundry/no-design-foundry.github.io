import React, { createContext, useContext, useRef, useState, useEffect } from "react"
import axios from "axios"
import FontFileInput from "./FontFileInput"
import TextInput from "./TextInput"
import { useFela } from "react-fela"
import Style from "./Style"
import { DetailViewContext } from "../templates/FilterDetailView"
import { Context } from "../App"
import { padding } from "../rules/variables"
import RangeInput from "./RangeInput"

export const formRule = ({props}) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  padding
})

let lastTimeStamp

function FontInputForm(props) {
  const { previewStrings, setPreviewStrings } = useContext(Context)
  const { setShowPreviewFont } = useContext(DetailViewContext)
  const { css } = useFela()
  const { inputs, fontIdentifier, title, route } = props
  const [fontString, setFontString] = useState("")
  const formRef = useRef()



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
        let value = {}
        value[fontIdentifier] = formData.get("preview_string")
        setPreviewStrings({...previewStrings, ...value})
        return formData.get("font_file").arrayBuffer()
      })
      .then(fontData => new FontFace("preview-input-font", fontData))
      .then(font => {
        document.fonts.add(font)
        setShowPreviewFont(true)
      })
      .catch(error => console.error(error))
  }


  useEffect(() => {
    if (formRef.current.checkValidity()) {
      sendRequest()
    }
  }, [])


  function handleOnChange(e) {
    if(e.target.name.length > 0) {
      lastTimeStamp = e.timeStamp
      setTimeout(function(){if(e.timeStamp === lastTimeStamp){
        if(formRef.current.checkValidity()) {
          sendRequest()
        }
      }}, 500)
    }
  }

  return (
    <>
      {(fontString.length > 0) && <Style>{fontString}</Style>}
      <form ref={formRef} className={css(formRule)} onChange={handleOnChange}>
        {props.children}
        <FontFileInput/>
        <TextInput
          title="preview string"
          name="preview_string"
          defaultValue={previewStrings[fontIdentifier]}
        ></TextInput>
        {inputs.map((input, index) => {
          switch (input.type) {
            case "slider":
              return <RangeInput key={`${route}_form_${index}`} {...input} />
            default:
              throw new Error("type not found")
          }
        })}
      </form>
    </>
  )
}

export default FontInputForm
