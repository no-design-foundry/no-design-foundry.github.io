import React, { useEffect, useRef } from 'react'
import { useFela } from 'react-fela'
import { column } from '../rules/rules'

function TextInput(props) {
    const {label, defaultValue, onChange} = props
    const inputRef = useRef()
    const {css} = useFela()
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
        <>
            <label className={css(column(1))}>{label}</label>
            <input ref={inputRef} className={css(column(3))} type="text" onChange={handleOnChange}></input>
        </>
    )
}

export default TextInput
