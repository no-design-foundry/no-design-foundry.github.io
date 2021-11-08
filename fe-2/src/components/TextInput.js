import React, { useEffect, useRef, useState } from "react";
import { useFela } from "react-fela";
import { inputRule, labelRule, labelValidityRule } from "../rules/form";
import { flex } from "../rules/generic";

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
    <div className={css(flex)}>
      <label className={css(labelValidityRule, labelRule)} htmlFor={name}>
        {title}
      </label>
      <div className={css(inputRule)}>
        <input
          ref={inputRef}
          name={name}
          type="text"
          required={true}
          onChange={handleOnChange}
        ></input>{" "}
      </div>
    </div>
  );
}

export default TextInput;
