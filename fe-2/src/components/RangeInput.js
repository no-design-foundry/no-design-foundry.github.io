import React, { useEffect, useRef, useContext, useState } from "react";
import { useFela } from "react-fela";
import { FormInputsContext } from "../App";
import { column } from "../rules/rules";
import { DetailViewContext } from "../templates/DetailView";

function RangeInput(props) {
  const {
    label,
    name,
    min,
    max,
    defaultValue,
    onChange,
    animatable = false,
  } = props;
  const inputRef = useRef();
  const { fontIdentifier } = useContext(DetailViewContext);
  const { formInputValues, setFormInputValue } = useContext(FormInputsContext);
  const [currentValue, setCurrentValue] = useState(
    formInputValues[fontIdentifier][name]
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
      setFormInputValue(fontIdentifier, name, value);
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
      ></input>
      <span>{currentValue}</span>
    </>
  );
}

export default RangeInput;
