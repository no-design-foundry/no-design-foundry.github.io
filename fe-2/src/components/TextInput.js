import React, {useEffect, useRef} from "react"

function TextInput(props) {
  const { title, name, defaultValue } = props
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.value = defaultValue
  }, [])

  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input ref={inputRef} name={name} type="text" required={true}></input>
    </>
  )
}

export default TextInput
