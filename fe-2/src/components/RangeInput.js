import React, { useRef, useEffect, useContext, useState } from "react";
import { useFela } from "react-fela";
import { validateMax } from "../helpers";
import { inputRule, labelRule } from "../rules/form";
import { alignItems, flex, padding, relative, width } from "../rules/generic";
import { insetShadow } from "../rules/variables";
import { DetailViewContext } from "../templates/FilterDetailView";

const rangeInputRule = ({ test }) => ({
  extend: {
    condition: test,
    style: {
      background: "red",
    },
  },
  "-webkit-appearance": "none",
  width: "100%",
  height: "4px",
  background: "silver",
  outline: "none",
  zIndex: 1000,
  ...insetShadow,
  borderRadius: "2px",
  "&::-webkit-slider-thumb": {
    "-webkit-appearance": "none",
    appearance: "none",
    width: "15px",
    height: "15px",
    background: "silver",
    filter: "drop-shadow(2px 2px 1px #000b)",
    cursor: "pointer",
    zIndex: 1000,
    borderRadius: "100%"
  },
  "&::-moz-range-thumb": {
    width: "20px",
    height: "20px",
    background: "black",
    cursor: "pointer",
    zIndex: 1000,
    borderRadius: "100%"
  },
});

const svgRule = () => ({
  position: "absolute",
  left: 0,
});

const inputWrapperRule = () => ({
  display: "flex",
  alignItems: "center",
});

const valueIndicatorRule = () => ({
  fontFeatureSettings: "'tnum' 1",
  textAlign: "right",
  marginLeft: "1ch"
});

function RangeInput(props) {
  const {
    title,
    name,
    min,
    max,
    defaultValue = (parseFloat(max) + parseFloat(min)) / 2,
    onChange = () => {},
    required = false,
    animatable,
    tag,
  } = props;
  const rangeInputRef = useRef();
  const animationInterval = useRef();
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState();
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const { variationSettings, setVariationSettings } =
    useContext(DetailViewContext);
  const { css } = useFela();

  useEffect(() => {
    rangeInputRef.current.value = defaultValue;
    return () => {
      clearInterval(animationInterval.current);
    };
  }, []);

  function handleOnChange(e) {
    if (tag) {
      let value = {};
      value[tag] = rangeInputRef.current.value;
      setVariationSettings({ ...variationSettings, ...value });
    }
    if (onChange) {
      onChange(e);
    }
    setCurrentValue(rangeInputRef.current.value);
  }

  function handleOnClickAnimate() {
    if (animating === true) {
      clearInterval(animationInterval.current);
    } else {
      animationInterval.current = setInterval(() => {
        rangeInputRef.current.value = parseInt(rangeInputRef.current.value) + 10 * direction;
        handleOnChange();
      }, 1000 / 30);
    }
    setAnimating(!animating);
  }

  return (
    <div className={css(flex)}>
      <label className={css(labelRule)} htmlFor={name}>
        {title}
      </label>
      <div className={css(inputWrapperRule, inputRule)}>
      {animatable && (
        <div
          className={css(relative, width("1.5em"), flex, alignItems("center"))}
          onClick={handleOnClickAnimate}
          role="button"
        >
          <svg
            className={css(svgRule)}
            width="1em"
            height="1em"
            viewBox="0 0 200 200"
          >
            {animating ? (
              <>
                <rect x="20" y="20" height="180" width="60" />
                <rect x="110" y="20" height="180" width="60" />
              </>
            ) : (
              <path d="M 30 0 L 180 100 L 30 200" />
            )}
          </svg>
        </div>
      )}
        <input
          ref={rangeInputRef}
          className={css(rangeInputRule)}
          onChange={onChange}
          name={name}
          min={min}
          max={max}
          type="range"
          required={required}
          onChange={handleOnChange}
        />
      </div>
      <span className={css(valueIndicatorRule)}>{currentValue}</span>
    </div>
  );
}

export default RangeInput;
