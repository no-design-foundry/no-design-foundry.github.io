import React from 'react'
import { useFela } from 'react-fela'

const inputWrapperRule = () => ({
  position: "relative",
  textDecoration: "underline"
})

function TextInput(props) {
  const {label, name, defaultValue, required=false} = props
  const {css} = useFela()
  return (
    <>
    <label htmlFor={name}>{label}</label>
    <div className={css(inputWrapperRule)}>
      <input type="text" {...{name, defaultValue, required}}/>
    </div>
    </>
  )
}

export default TextInput