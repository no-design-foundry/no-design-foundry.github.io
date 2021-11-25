import React, { useEffect, useRef } from 'react'

function TextInput(props) {
    const {label, defaultValue, onChange} = props
    const inputRef = useRef()
    useEffect(() => {
        if (defaultValue) {
            inputRef.current.value = defaultValue
        }
    }, [])

    function handleOnChange() {
        if (inputRef.current.checkValidity()) {
            if (onChange) {
                onChange(inputRef.current.value)
            }
        }
    }
    return (
        <div>
            <label>{label}</label>
            <input ref={inputRef} type="text" onChange={handleOnChange}></input>
        </div>
    )
}

export default TextInput
