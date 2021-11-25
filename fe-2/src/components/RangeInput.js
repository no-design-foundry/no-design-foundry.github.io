import React, { useEffect, useRef, useContext, useState } from 'react'
import { FormInputsContext } from '../App'
import { DetailViewContext } from '../templates/DetailView'

function RangeInput(props) {
    const {label, name, min, max, defaultValue, onChange} = props
    const inputRef = useRef()
    const {fontIdentifier} = useContext(DetailViewContext)
    const {formInputValues, setFormInputValue} = useContext(FormInputsContext)
    const [currentValue, setCurrentValue] = useState(formInputValues[fontIdentifier][name])

    useEffect(() => {
        inputRef.current.value = currentValue || defaultValue
        if (!currentValue) {
            setCurrentValue(defaultValue)
        }
    }, [])

    function handleOnChange(e) {
        if (inputRef.current.checkValidity()) {
            if (onChange) {
                onChange(e)
            }
            const value = parseInt(e.target.value)
            setCurrentValue(value)
            setFormInputValue(fontIdentifier, name, value)
        }
    }
    return (
        <div>
            <label>{label}</label>
            <input ref={inputRef} type="range" onChange={handleOnChange} min={min} max={max}></input><span>{currentValue}</span>
        </div>
    )
}

export default RangeInput
