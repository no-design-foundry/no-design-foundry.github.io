import React, { useRef, useState, useEffect } from "react"
import { useFela } from "react-fela"
import {validateMax} from "../../helpers"

const rangeInputRule = ({ props }) => ({
  "-webkit-appearance": "none",
  width: "100%",
  height: "2px",
  background: "#000",
  outline: "none",
  zIndex: 1000,
  "&::-webkit-slider-thumb": {
    "-webkit-appearance": "none",
    appearance: "none",
    width: "25px",
    height: "12px",
    background: "black",
    cursor: "pointer",
    zIndex: 1000,
  },
  "&::-moz-range-thumb": {
    width: "25px",
    height: "12px",
    background: "black",
    cursor: "pointer",
    zIndex: 1000,
  },
})

const inputWrapperRule = ({}) => ({
  display: "flex",
  alignItems: "center"
})

const numberInputRule = ({}) => ({
  fontFeatureSettings: "'tnum' 1"
})

function InputRange(props) {
  const {
    title,
    name,
    min,
    max,
    default_ = (parseFloat(max) + parseFloat(min)) / 2,
    onChange = () => {},
    required = false,
  } = props
  const { css } = useFela()
  const [currentValue, setCurrentValue] = useState(0)
  const rangeInputRef = useRef()
  const numberInputRef = useRef()

  useEffect(() => {
    rangeInputRef.current.value = default_
    numberInputRef.current.value = default_
  }, [])

  return (
    <>
      <label htmlFor={name}>{title}</label>
      <div className={css(inputWrapperRule)}>
        <input
          ref={rangeInputRef}
          className={css(rangeInputRule)}
          onChange={e => {
            numberInputRef.current.value = e.target.value
            onChange(e)
          }}
          name={name}
          min={min}
          max={max}
          type="range"
          required={required}
        />
        <input
          ref={numberInputRef}
          className={css(numberInputRule)}
          type="number"
          min={min}
          max={max}
          onChange={e => {
            if(validateMax(e.target)) return
            rangeInputRef.current.value = e.target.value
            onChange(e)
          }}
        ></input>
      </div>
    </>
  )
}

export default InputRange
