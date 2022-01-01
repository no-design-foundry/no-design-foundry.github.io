import React, { useEffect, useRef, useContext, useState } from "react";
import { useFela } from "react-fela";
import { FormInputsContext } from "../App";
import { column } from "../rules/rules";
import { DetailViewContext } from "../templates/DetailView";

const valueIndicatorRule = () => ({
  fontVariantNumeric: "tabular-nums",
  padding: "0 .2em",
});

const buttonRule = () => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
})

const placeholderRule = () => ({
  visibility: "hidden"
})

function RangeInput(props) {
  const {
    label,
    name,
    min,
    max,
    value,
    onChange,
    animatable = false,
    disabled = false,
    rules = []
  } = props;
  const inputRef = useRef();
  const animationInterval = useRef();
  const [animating, setAnimating] = useState();
  const { filterIdentifier } = useContext(DetailViewContext);
  const { setFormInputValue } = useContext(FormInputsContext);
  const [currentValue, setCurrentValue] = useState(value);
  const { css } = useFela({animating});
  
  useEffect(() => {
    inputRef.current.value = currentValue;
    return () => {
      clearInterval(animationInterval.current)
    }
  }, []);
  
  function handleOnChange(e) {
    if (inputRef.current.checkValidity()) {
      const value = parseInt(e.target.value);
      setCurrentValue(value);
      if (onChange) {
        onChange(e.target.value);
      }
      if (name) {
        setFormInputValue(filterIdentifier, name, value);
      }
    }
  }

  function handleOnClickAnimate() {
    if (animating === true) {
      clearInterval(animationInterval.current);
    } else {
      let counter = 0;
      const start = currentValue;
      animationInterval.current = setInterval(() => {
        const position = (start + counter) % 720;
        const value = Math.round(position - 360 < 0 ? position : 360 - (position % 360))
        setCurrentValue(value)
        inputRef.current.value = value;
        if (onChange) {
          onChange(value)
        }
        const offset =
          10 - ((Math.cos((Math.PI * position) / 180) + 1) / 2) * 9;
        counter += offset;
      }, 1000 / 30);
    }
    setAnimating(!animating);
  }

  return (
    <>
      <label className={css(column(1), ...rules)}>{label}</label>
      {animatable && (
        <button className={css(buttonRule, column(2), ...rules)} onClick={handleOnClickAnimate}>
          <span>{animating ? "stop" : "play"}</span>
          <span className={css(placeholderRule)} aria-label="hidden">play</span>
          <span className={css(placeholderRule)} aria-label="hidden">stop</span>
        </button>
      )}
      <input
        ref={inputRef}
        className={css(column(3), ...rules)}
        type="range"
        onChange={handleOnChange}
        min={min}
        max={max}
        disabled={disabled}
      ></input>
      <div className={css(valueIndicatorRule, ...rules)} disabled={disabled}>
        {currentValue}
      </div>
    </>
  );
}

export default RangeInput;
