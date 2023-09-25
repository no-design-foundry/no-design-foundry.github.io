import React, { useContext, useState } from 'react'
import { useFela } from 'react-fela'
import FilterContext from '../contexts/FilterContext'
import InputMemoryContext from '../contexts/InputMemoryContext'

const inputWrapperRule = () => ({
  position : "relative"
})

const masterRule = () => ({
  top: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "20ch",
  height: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "block",
})

const puppetRule = () => ({
  opacity: 0,
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
})

function FileInput(props) {
  const {css} = useFela()
  const {identifier:filterIdentifier} = useContext(FilterContext)
  const identifier = `${filterIdentifier}-fontfile`
  const {setInputMemory, getInputMemory} = useContext(InputMemoryContext)
  const inputFile = getInputMemory(identifier)
  function handleOnInput(e) {
    if(e.target.files.length === 1) {
      setInputMemory(identifier, e.target.files[0])
    }
    else {
      setInputFile(identifier, null)
    }
  }
  return (
    <>
    <label>font</label>
    <span className={css(inputWrapperRule)}>
      <button className={css(masterRule)}>
        {inputFile?.name ?? "Upload a font"}
      </button>
      <input className={css(puppetRule
        )} onInput={handleOnInput} name="font_file" type="file"></input>
    </span>
    </>
  )
}

export default FileInput