import React, { createContext, useState } from "react";

const InputMemoryContext = createContext();
export default InputMemoryContext;

export function InputMemoryContextWrapper({ children }) {
  const [data, setData] = useState({});
  function getInputMemory(identifier, name) {
    return data?.[identifier]?.[name];
  }
  function setInputMemory(identifier, name, value) {
    if (!(identifier in data)) {
      let collector = {};
      collector[identifier] = { name: value };
      setData({ ...data, ...collector });
    } else {
      let collector = data;
      collector[identifier][name] = value;
      setData({ ...collector });
    }
  }
  return (
    <InputMemoryContext.Provider value={{ getInputMemory, setInputMemory }}>
      {children}
    </InputMemoryContext.Provider>
  );
}
