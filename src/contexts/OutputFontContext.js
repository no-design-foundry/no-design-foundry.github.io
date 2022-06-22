import React, { createContext, useState } from 'react'

const OutputFontContext = createContext()
export default OutputFontContext

export function OutputFontContextWrapper({children}) {
  const [data, setData] = useState({})
  function setOutputFonts(identifier, familyNames) {
    let collector = {...data}
    collector[identifier] = familyNames
    setData(collector)
  }
  return (
    <OutputFontContext.Provider value={{setOutputFonts, outputFonts: data}}>{children}</OutputFontContext.Provider>
  )
}

