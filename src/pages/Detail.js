import React, { useContext, useEffect, useRef, useState } from "react";
import { useFela } from "react-fela";
import FontPreview from "../components/FontPreview";
import Form from "../components/Form";
import FilterContext from "../contexts/FilterContext";
import { Transition } from "react-transition-group";

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
  userSelect: "none",
});

const previewRule = () => ({
  position: "absolute",
  display: "inline-block",
});

const getTransitionRule = (state) => () => ({
  opacity: ["entering", "exiting"].includes(state) ? 0 : 1,
  transition: "opacity 1s ease-in",
});

function Detail() {
  const { title } = useContext(FilterContext);
  const { css } = useFela();
  return (
    <div
      className={css(wrapperRule)}
      data-font-preview
    >
      <FontPreview className={css(previewRule)}>{title}</FontPreview>
    </div>
  );
}

export default Detail;
