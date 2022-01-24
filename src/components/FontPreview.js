import React, { useEffect, useState, useRef, useContext } from "react";
import { useFela } from "react-fela";
import { dictToFontVariationSettings } from "../misc";
import { FontPreviewMarginsContext, FontPreviewsContext } from "../Contexts";
import RangeInput from "./RangeInput";

export const fontPreviewOpacityTransition = 350;

const itemRule = ({ previewedFontFamily, inListView, visible, color, marginBottom, marginTop }) => ({
  userSelect: "none",
  transitionDuration: `${fontPreviewOpacityTransition}ms`,
  transitionProperty: "opacity, filter",
  transitionTimingFunction: "ease-in",
  whiteSpace: "nowrap",
  textRendering: "optimizeSpeed",
  marginBottom: `${(inListView || (!inListView && marginBottom)) ? -0.226 : marginBottom}em`,
  marginTop: `${(inListView || (!inListView && marginTop))? -0.204 : marginTop}em`,
  transform: "translateZ(0)",
  willChange: "font-size, font-variation-settings, opacity, filter",
  extend: [
    {
      condition: previewedFontFamily,
      style: {
        fontFamily: previewedFontFamily,
      },
    },
    {
      condition: color,
      style: {
        color,
      },
    },
    {
      condition: !visible,
      style: {
        opacity: 0,
        filter: "blur(.025em)",
      },
    },
  ],
});

const containerRule = ({ inListView }) => ({
  zIndex: -1,
  userSelect: "none",
  // pointerEvents: "none",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: inListView ? "flex-start" : "center",
  extend: [
    {
      condition: inListView,
      style: {
        height: "100%",
      },
    },
  ],
});

function FontPreview(props) {
  const {
    inListView = false,
    color,
    children,
    fontSize
  } = props;
  const contentRef = useRef();
  const [visible, setVisible] = useState(false);
  const { marginBottom, marginTop } = useContext(FontPreviewMarginsContext).fontPreviewMargins;
  const fontPreviews = useContext(FontPreviewsContext)

  useEffect(() => {
    if (fontPreviews) {
      fontPreviews.current.push(contentRef.current)
    }
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  useEffect(() => {
    contentRef.current.style.fontSize = fontSize + "px"
  }, [fontSize]);
  

  const { css } = useFela({
    visible,
    inListView,
    color,
    marginTop,
    marginBottom
  });

  return (
    <div className={css(containerRule)}>
      <span
        ref={contentRef}
        className={css(itemRule)}
      >
          {children}
      </span>
    </div>
  );
}

export default FontPreview;
