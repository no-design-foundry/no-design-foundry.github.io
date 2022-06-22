import React, { useContext, useRef, useState } from "react";
import { useFela } from "react-fela";
import FilterContext from "../contexts/FilterContext";
import InputMemoryContext from "../contexts/InputMemoryContext";
import Input from "./Input";

const borderRadius = "14px";

const inputRule = ({ position }) => ({
  appearance: "none",
  "-webkit-appearance": "none",
  height: "3px",
  borderRadius,
  // boxShadow: "inset 0 2px 2px #00000066",
  "&::-webkit-slider-thumb, &::-moz-range-thumb": {
    appearance: "none",
    "-webkit-appearance": "none",
    height: "20px",
    width: "20px",
    background: "#00F",
    borderRadius: "100%",
    // filter: "drop-shadow(0 2px 3px #00000066)",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },

  background: "#EEE",
  "&::-moz-range-progress": {
    // boxShadow: "inset 0 2px 2px #00000066",
    background: "#CCC",
    height: "100%",
    borderRadius,
  },
  "@supports not selector(::-moz-range-progress)": {
    // background: "red",
    background: `linear-gradient(to right, #00F 0%, #00F ${position}%, #EEE ${position}%, #EEE 100%)`,
    "&:disabled": {
      background: `linear-gradient(to right, #DDD 0%, #DDD ${position}%, #EEE ${position}%, #EEE 100%) !important`,
    },
  },
  "&:disabled": {
    "&::-webkit-slider-thumb, &::-moz-range-thumb": {
      background: "#EEE",
    },
  },
});

function Slider(props) {
  const {
    children,
    label,
    name,
    min,
    max,
    defaultValue,
    onInput,
    required = false,
  } = props;
  const [position, setPosition] = useState((defaultValue - min) / (max - min));
  const inputIdentifier = name || label.replace(" ", "");
  const { css } = useFela({ position: position * 100 });

  function handleOnInput(e) {
    if (onInput) {
      onInput(e);
    }
    const { value } = e.target;
    setPosition((value - min) / (max - min));
  }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type="range"
        className={css(inputRule)}
        defaultValue={defaultValue}
        min={min}
        max={max}
        required={required}
        onInput={handleOnInput}
      />
    </>
  );
}

export default Slider;
