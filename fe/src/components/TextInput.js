import React, { useEffect, useRef, useState } from "react";
import { useFela } from "react-fela";
import { disabledTextInputRule, inputRule, labelRule, labelValidityRule } from "../rules/form";
import { flex } from "../rules/generic";

function TextInput(props) {
  const { title, name, defaultValue, disabled } = props;
  const inputRef = useRef();
  const [isValid, setIsValid] = useState(true);
  const { css } = useFela({isValid, disabled});

  useEffect(() => {
    inputRef.current.value = defaultValue;
    setIsValid(inputRef.current.checkValidity());
  }, []);

  function handleOnChange() {
    setIsValid(inputRef.current.checkValidity());
  }

  return (
    <>
      <label className={css(labelValidityRule, labelRule)} htmlFor={name}>
        {title}
      </label>
      <div className={css(inputRule, disabledTextInputRule)}>
        <input
          ref={inputRef}
          name={name}
          type="text"
          required={true}
          onChange={handleOnChange}
          disabled={disabled}
        ></input>{" "}
      </div>
    </>
  );
}

export default TextInput;
