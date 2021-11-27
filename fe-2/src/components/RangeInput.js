import React, { useEffect, useRef, useContext, useState } from "react";
import { useFela } from "react-fela";
import { FormInputsContext } from "../App";
import { column } from "../rules/rules";
import { DetailViewContext } from "../templates/DetailView";

const valueIndicatorRule = () => ({
  fontVariantNumeric: "tabular-nums"
})

function RangeInput(props) {
  const {
    label,
    name,
    min,
    max,
    defaultValue,
    onChange,
    animatable = false,
    disabled = false
  } = props;
  const inputRef = useRef();
  const { filterIdentifier } = useContext(DetailViewContext);
  const { formInputValues, setFormInputValue } = useContext(FormInputsContext);
  const [currentValue, setCurrentValue] = useState(
    formInputValues[filterIdentifier][name]
  );
  const { css } = useFela();

  useEffect(() => {
    inputRef.current.value = currentValue || defaultValue;
    if (!currentValue) {
      setCurrentValue(defaultValue);
    }
  }, []);

  function handleOnChange(e) {
    if (inputRef.current.checkValidity()) {
      if (onChange) {
        onChange(e);
      }
      const value = parseInt(e.target.value);
      setCurrentValue(value);
      if (name) {
        setFormInputValue(filterIdentifier, name, value);
      }
    }
  }
  return (
    <>
      <label className={css(column(1))}>{label}</label>
      {animatable && <button className={css(column(2))}>play</button>}
      <input
        ref={inputRef}
        className={css(column(3))}
        type="range"
        onChange={handleOnChange}
        min={min}
        max={max}
        disabled={disabled}
      ></input>
      <span className={css(valueIndicatorRule)} disabled={disabled}>{currentValue}</span>
    </>
  );
}

export default RangeInput;
