import React, { useContext, useEffect } from "react";
import FilterContext from "../contexts/FilterContext";
import InputMemoryContext from "../contexts/InputMemoryContext";

function InputWrapper({ children }) {
  const { identifier } = useContext(FilterContext);
  const { getInputMemory, setInputMemory } = useContext(InputMemoryContext);
  console.log(children, getInputMemory(identifier, children.props.name))
  return React.cloneElement(children, {
    defaultValue: getInputMemory(identifier, children.props.name) || children.props.defaultValue,
  });
}

export default InputWrapper;
