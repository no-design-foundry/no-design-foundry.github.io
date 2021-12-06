import React, { useEffect, useRef } from "react";
import { useFela } from "react-fela";
import { column } from "../rules/rules";

const inputRule = () => ({
  background: "transparent",
  outline: "none",
  border: "none"
})

function TextInput(props) {
  const { label, defaultValue, onChange, disabled } = props;
  const inputRef = useRef();
  const { css } = useFela();
  useEffect(() => {
    if (defaultValue) {
      inputRef.current.value = defaultValue;
    }
  }, []);

  function handleOnChange() {
    if (inputRef.current.checkValidity()) {
      if (onChange) {
        onChange(inputRef.current.value);
      }
    }
  }
  return (
    <>
      <label className={css(column(1))}>{label}</label>
      <input
        ref={inputRef}
        className={css(inputRule, column(3))}
        type="text"
        onChange={handleOnChange}
        disabled={disabled}
      ></input>
    </>
  );
}

export default TextInput;
