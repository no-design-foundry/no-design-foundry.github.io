import React, { useContext, useEffect, useRef } from "react";
import { useFela } from "react-fela";
import Form from "../components/Form";
import FilterContext from "../contexts/FilterContext";

const wrapperRule = () => ({
  position: "absolute",
  zIndex: -1,
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  userSelect: "none"
})

const previewRule = (color, layerIndex) => ({ identifier }) => ({
    position: "absolute",
    fontFamily: `${identifier}-${layerIndex}`,
    color,
    display: "inline-block"
  });

function Detail() {
  const { title, identifier, layerColors } = useContext(FilterContext);
  const { css } = useFela({ identifier });
  return (
    <div className={css(wrapperRule)} data-font-preview>
       {layerColors.map((layerColor, index) => (
        <div
          key={`${identifier}-${index}`}
          className={css(previewRule(layerColor, index))}
        >
          {title}
        </div>
      ))}
    </div>
  );
}

export default Detail;
