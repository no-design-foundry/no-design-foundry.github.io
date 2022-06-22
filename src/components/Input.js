import React, { useContext, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import FilterContext from '../contexts/FilterContext';
import InputMemoryContext from '../contexts/InputMemoryContext';

let value
function Input(props) {
  const {identifier: inputIdentifier, name, onInput, ...kwargs} = props
  const {identifier: filterIdentifier } = useContext(FilterContext)
  const {getInputMemory, setInputMemory} = useContext(InputMemoryContext)
  
  function handleOnInput(e) {
    if (onInput) {
      onInput(e)
    }
    value = parseFloat(e.target.value)
  }

  useEffect(() => {
    console.log(getInputMemory(filterIdentifier, inputIdentifier))
    return () => {
      setInputMemory(filterIdentifier, inputIdentifier, value)      
    }
  }, [])

  return (
    <input name={inputIdentifier} {...kwargs} onInput={handleOnInput}/>
  )
}

export default Input