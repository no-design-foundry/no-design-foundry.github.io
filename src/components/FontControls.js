import React, { useContext, useEffect, useRef } from "react";
import FilterInfoContext from "../contexts/FilterContext";
import InputWrapper from "./InputWrapper";
import Slider from "./Slider";

function FontControls() {
  const { variableFontControlSliders = [], identifier } = useContext(FilterInfoContext);
  const currentVariableSettings = useRef(variableFontControlSliders.reduce((collector, slider) => {
    collector[slider.tag] = slider.defaultValue
    return collector
  },{}))

  function variableSettingsToString() {
    return Object.entries(currentVariableSettings.current).map(([key_, value_]) => `"${key_}" ${value_}`).join(", ")
  }

  function handleOnFontSizeInput(e) {
    document.querySelector("[data-font-preview]").style.fontSize=`${e.target.value}px`
  }

  function handleOnVariableInput({tag, value}) {
    currentVariableSettings.current[tag] = parseFloat(value)
    document.querySelector("[data-font-preview]").style.fontVariationSettings = variableSettingsToString()
  }

  useEffect(() => {
    document.fonts.ready.then(() => {
      const preview = document.querySelector(["[data-font-preview]"])
      preview.style.fontVariationSettings = variableSettingsToString()
      const currentFontSize = parseInt(window.getComputedStyle(preview)["font-size"])
      const scale = window.innerWidth/preview.firstChild.offsetWidth
      preview.style.fontSize = `${currentFontSize*scale}px`
    })
    return () => {
      console.log(variableSettingsToString())
    }
  }, [identifier])

  return (
    <>
      <Slider key={identifier} label={"font size"} min={10} max={window.innerHeight} defaultValue={500} onInput={handleOnFontSizeInput}></Slider>
      {variableFontControlSliders.map((slider, index) => (
        <Slider key={`${identifier}-variable-font-slider-${index}`} {...slider} onInput={(e) => handleOnVariableInput({value:e.target.value, tag:slider.tag})}></Slider>
      ))}
    </>
  );
}

export default FontControls;
