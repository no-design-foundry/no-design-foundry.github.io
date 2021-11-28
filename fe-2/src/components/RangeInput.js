import React, { useEffect, useRef, useContext, useState } from "react";
import { useFela } from "react-fela";
import { FormInputsContext } from "../App";
import { column } from "../rules/rules";
import { DetailViewContext } from "../templates/DetailView";

const valueIndicatorRule = () => ({
  fontVariantNumeric: "tabular-nums",
  padding: "0 .2em",
});

function RangeInput(props) {
  const {
    label,
    name,
    min,
    max,
    defaultValue,
    onChange,
    animatable = false,
    disabled = false,
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

  function handleIndicatorOnChange(e) {
    console.log(e)
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
      <div
        className={css(valueIndicatorRule)}
        disabled={disabled}
        onChange={handleIndicatorOnChange}
      >
        {currentValue}
      </div>
    </>
  );
}

export default RangeInput;
