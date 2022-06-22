import React, { useContext, useEffect, useRef, useState } from "react";
import { useFela } from "react-fela";
import FilterContext from "../contexts/FilterContext";
import OutputFontContext from "../contexts/OutputFontContext";
import { Transition } from "react-transition-group";

const duration = 500;

const getLayerRule =
  (index) =>
  ({ identifier, layerColors, fontFamilies = [], opacity = 1 }) => ({
    filter: opacity ? "blur(0px)" : "blur(10px)",
    opacity,
    transitionProperty: "opacity, filter",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "ease-in",
    color: layerColors[index],
    extend: [
      {
        condition: index !== 0,
        style: {
          position: "absolute",
          top: 0,
        },
      },
      {
        condition: fontFamilies?.length,
        style: {
          fontFamily: fontFamilies[index]
        },
      },
      {
        condition: !fontFamilies?.length,
        style: {
          fontFamily: `${identifier}-${index}`,
        },
      },
    ],
  });

function FontPreview({ children, className }) {
  const { identifier, layerColors } = useContext(FilterContext);
  const { outputFonts } = useContext(OutputFontContext);
  const fontFamilies = outputFonts?.[identifier]
  // const [opacity, setOpacity] = useState(1);
  // const mounted = useRef(false);
  // const [currentFontFamilies, setCurrentFontFamilies] = useState(fontFamilies);
  const { css } = useFela({
    // opacity,
    layerColors,
    identifier,
    fontFamilies,
  });

  // useEffect(() => {
  //   if (fontFamilies?.length && mounted.current) {
  //     setOpacity(0);
  //     setTimeout(() => {
  //       setCurrentFontFamilies(fontFamilies);
  //       setOpacity(1);
  //     }, duration + 50);
  //   }
  //   mounted.current = true;
  //   return () => {
  //     setCurrentFontFamilies([])
  //   }
  // }, [fontFamilies]);
  return (
    <div className={className}>
      {layerColors.map((color, index) => (
        <div
          key={`${identifier}-${color}`}
          className={css(getLayerRule(index))}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default FontPreview;
