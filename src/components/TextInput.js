import React, { useEffect, useRef } from "react";
import { useFela } from "react-fela";
import { column } from "../rules/rules";

const inputRule = () => ({
  background: "transparent",
  outline: "none",
  border: "none"
})

function TextInput(props) {
  const { label, value, onChange, disabled } = props;
  const inputRef = useRef();
  const { css } = useFela();
  useEffect(() => {
    inputRef.current.value = value
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
      <label className={css(column(1))} disabled={disabled}>{label}</label>
      <input
        ref={inputRef}
        className={css(inputRule, column(2))}
        type="text"
        onChange={handleOnChange}
        disabled={disabled}
      ></input>
    </>
  );
}

export default TextInput;
