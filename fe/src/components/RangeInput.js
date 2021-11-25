import React, { useRef, useEffect, useContext, useState } from "react";
import { useFela } from "react-fela";
import { FormInputsContext } from "../App";
import { disabledInputRule, inputRule, labelRule } from "../rules/form";
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
    disabled = false
  } = props;
  const {formInputs, setFormInputs} = useContext(FormInputsContext)
  const rangeInputRef = useRef();
  const animationInterval = useRef();
  const [animating, setAnimating] = useState();
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const { variationSettings, setVariationSettings } =
    useContext(DetailViewContext);
  const { css } = useFela({disabled});

  useEffect(() => {
    rangeInputRef.current.value = defaultValue;
    return () => {
      clearInterval(animationInterval.current);
      setAnimating(false)
    };
  }, []);

  function handleOnChange(e) {
    onChange(e);
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
      let counter = 0
      const start = currentValue
      animationInterval.current = setInterval(() => {
        const position = (start + counter) % 720
        setCurrentValue(Math.round(position - 360 < 0 ? position : 360 - position % 360 ))
        const offset = 10-(Math.cos(Math.PI * position/180)+1)/2*9
        counter += offset
      }, 1000 / 30);
    }
    setAnimating(!animating);
  }
  // console.log(formInputs)
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
          disabled={disabled}
        />
      </div>
      <span className={css(valueIndicatorRule)}>{currentValue}</span>
    </>
  );
}

export default RangeInput;
