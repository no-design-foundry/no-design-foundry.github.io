import React, { useRef } from "react"
import FontInputSlider from "./FontInputSlider"
import axios from "axios"
import FontFileInput from "./FontFileInput"
import TextInput from "./TextInput"
import { useFela } from "react-fela"
import formRule from "../rules/formRule"


function FontInputForm(props) {
  const {css} = useFela()
  const { inputs, fontIdentifier } = props
  const formRef = useRef()
  var lastTimeStamp = 0

  function sendRequest() {
    const formData = new FormData(formRef.current)
    axios({
      method: "post",
      url: `http://0.0.0.0:5000/filters/${fontIdentifier}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(response => console.log(response))
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
    <form ref={formRef} className={css(formRule)} onChange={handleOnChange}>
      <FontFileInput title="font file"/>
      <TextInput title="preview string" name="preview_string" defaultValue={fontIdentifier}></TextInput>
      {inputs.map(input => {
        switch (input.type) {
          case "slider":
            return <FontInputSlider {...input} />
        }
      })}
    </form>
  )
}

export default FontInputForm
