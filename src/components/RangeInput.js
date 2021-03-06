import React, { useEffect, useRef, useContext, useState } from "react";
import { useFela } from "react-fela";
import { FormInputsContext } from "../Contexts";
import { column } from "../rules/rules";
import { DetailViewContext } from "../templates/DetailView";

const valueIndicatorRule = () => ({
  fontVariantNumeric: "tabular-nums",
  padding: "0 .2em",
});

const borderRadius = ["12px", "8px"]
const inputRule = ({position}) => ({
  appearance: "none",
  "-webkit-appearance": "none",
  height: ["12px", "8px"],
  borderRadius,
  boxShadow: "inset 0 2px 2px #00000066",
  "&::-webkit-slider-thumb, &::-moz-range-thumb": {
    appearance: "none",
    "-webkit-appearance": "none",
    height: ["26px", "18px"],
    width: ["26px", "18px"],
    background: "#333",
    borderRadius: "100%",
    filter: "drop-shadow(0 2px 3px #00000066)",
    border: "none",
    outline: "none",
    cursor: "pointer"
  },
  
  background: "#EEE",
  "&::-moz-range-progress": {
    boxShadow: "inset 0 2px 2px #00000066",
    background: "#CCC",
    height: "100%",
    borderRadius
  },
  "@supports not selector(::-moz-range-progress)": {
    background: `linear-gradient(to right, #CCC 0%, #CCC ${position}%, #EEE ${position}%, #EEE 100%)`,
    "&:disabled": {
      background: `linear-gradient(to right, #DDD 0%, #DDD ${position}%, #EEE ${position}%, #EEE 100%) !important`,
    },
  },
  "&:disabled": {
    "&::-webkit-slider-thumb, &::-moz-range-thumb": {
      background: "#EEE"
    }
  }
})

function RangeInput(props) {
  const {
    className,
    label,
    name,
    min,
    max,
    value,
    onChange,
    animatable = false,
    disabled = false,
  } = props;
  const inputRef = useRef();
  const animationInterval = useRef();
  const [animating, setAnimating] = useState();
  const { filterIdentifier } = useContext(DetailViewContext);
  const { setFormInputValue } = useContext(FormInputsContext);
  const [currentValue, setCurrentValue] = useState(value);
  const { css } = useFela({animating, position:currentValue/max*100});
  
  useEffect(() => {
    inputRef.current.value = currentValue;
    return () => {
      clearInterval(animationInterval.current)
    }
  }, []);
  
  function handleOnChange(e) {
    if (inputRef.current.checkValidity()) {
      const value = parseInt(e.target.value);
      setCurrentValue(value);
      if (onChange) {
        onChange(e.target.value);
      }
      if (name) {
        setFormInputValue(filterIdentifier, name, value);
      }
    }
  }

  // function handleOnClickAnimate() {
  //   if (animating === true) {
  //     clearInterval(animationInterval.current);
  //   } else {
  //     let counter = 0;
  //     const start = currentValue;
  //     animationInterval.current = setInterval(() => {
  //       const position = (start + counter) % 720;
  //       const value = Math.round(position - 360 < 0 ? position : 360 - (position % 360))
  //       setCurrentValue(value)
  //       inputRef.current.value = value;
  //       if (onChange) {
  //         onChange(value)
  //       }
  //       const offset =
  //         10 - ((Math.cos((Math.PI * position) / 180) + 1) / 2) * 9;
  //       counter += offset;
  //     }, 1000 / 30);
  //   }
  //   setAnimating(!animating);
  // }

  return (
    <>
      <label className={[css(column(1)), className].join(" ")} disabled={disabled}>{label}</label>
      {/* {animatable && (
        <button className={css(buttonRule, column(2))} onClick={handleOnClickAnimate}>
          <span>{animating ? "stop" : "play"}</span>
          <span className={css(placeholderRule)} aria-label="hidden">play</span>
          <span className={css(placeholderRule)} aria-label="hidden">stop</span>
        </button>
      )} */}
      <input
        ref={inputRef}
        className={[css(column(2), inputRule), className].join(" ")}
        type="range"
        onChange={handleOnChange}
        min={min}
        max={max}
        disabled={disabled}
      ></input>
      <div className={[css(valueIndicatorRule), className].join(" ")} disabled={disabled}>
        {currentValue}
      </div>
    </>
  );
}

export default RangeInput;
