import React, { useEffect, useRef, useState } from "react";
import { useFela } from "react-fela";
import { inputValidityRule, labelValidityRule } from "../rules/form";

function TextInput(props) {
  const { title, name, defaultValue } = props;
  const inputRef = useRef();
  const [isValid, setIsValid] = useState(true);
  const { css } = useFela({isValid});

  useEffect(() => {
    inputRef.current.value = defaultValue;
    setIsValid(inputRef.current.checkValidity());
  }, []);

  function handleOnChange() {
    setIsValid(inputRef.current.checkValidity());
  }

  return (
    <>
      <label className={css(labelValidityRule)} htmlFor={name}>
        {title}
      </label>
      <div className={css(inputValidityRule)}>
        <input
          ref={inputRef}
          name={name}
          type="text"
          required={true}
          onChange={handleOnChange}
        ></input>{" "}
      </div>
    </>
  );
}

export default TextInput;
