import React, { useRef, useEffect, useContext, useState } from "react";
import { useFela } from "react-fela";
import { inputRule, labelRule } from "../rules/form";
import { DetailViewContext } from "../templates/FilterDetailView";

const valueIndicatorRule = () => ({
  fontFeatureSettings: "'tnum' 1",
  // textAlign: "right",
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
      setAnimating(false)
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

  useEffect(() => {
    rangeInputRef.current.value = currentValue
    if (tag) {
      let value = {}
      value[tag] = currentValue
      setVariationSettings({ ...variationSettings, ...value });
    }
  }, [currentValue])

  function handleOnClickAnimate() {
    if (animating === true) {
      clearInterval(animationInterval.current);
    } else {
      let counter = 1-currentValue/max*2
      counter = min+counter * max
      const start = Math.PI * (currentValue-min)/(max-min)
      animationInterval.current = setInterval(() => {
        const value = min + (Math.cos(start + Math.PI * counter/max)+1)/2 * max
        setCurrentValue(Math.round(value))
        counter += 1
      }, 1000 / 30);
    }
    setAnimating(!animating);
  }

  return (
    <>
      <label className={css(labelRule)} htmlFor={name}>
        {title}
      </label>
      {animatable && (
        <div
          role="button"
          onClick={handleOnClickAnimate}
        >
          {animating ? "stop" : "play"}
        </div>
      )}
      <div className={css(inputRule)}>
        <input
          ref={rangeInputRef}
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
    </>
  );
}

export default RangeInput;
