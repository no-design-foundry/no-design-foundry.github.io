import React, { useRef, useState, useEffect } from "react"
import { useFela } from "react-fela"
import { validateMax } from "../../helpers"

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

const inputWrapperRule = ({ props }) => ({
  display: "flex",
  alignItems: "center",
})

const numberInputRule = ({ props }) => ({
  fontFeatureSettings: "'tnum' 1",
})

function InputRange(props) {
  const {
    title,
    name,
    min,
    max,
    defaultValue = (parseFloat(max) + parseFloat(min)) / 2,
    onChange = () => {},
    required = false,
    animatable
  } = props
  const { css } = useFela()
  const rangeInputRef = useRef()
  const numberInputRef = useRef()
  let animating = false
  let animatingInterval = null
  
  useEffect(() => {
    rangeInputRef.current.value = defaultValue
    numberInputRef.current.value = defaultValue
  }, [])

  function handleOnClickAnimate(){
    console.log("click")
    if (animating === true) {
      clearInterval(animatingInterval)
    }
    else {
      animatingInterval = setInterval(() => {
        console.log("animating")
        rangeInputRef.current.value = parseInt(rangeInputRef.current.value) + 1
      }, 1000/30)
    }
    animating = !animating
  }

  return (
    <>
      <label htmlFor={name}>{title}</label>
      <div className={css(inputWrapperRule)}>
         {animatable && <div onClick={handleOnClickAnimate} role="button">Animate</div>}
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
            if (validateMax(e.target)) return
            rangeInputRef.current.value = e.target.value
            onChange(e)
          }}
        ></input>
      </div>
    </>
  )
}

export default InputRange
