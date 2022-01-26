import React, { useEffect, useState, useRef, useContext } from "react";
import { useFela } from "react-fela";
import { dictToFontVariationSettings } from "../misc";
import { FontPreviewMarginsContext, FontPreviewsContext } from "../Contexts";


const itemRule = ({
  fontFamily,
  inListView,
  visible,
  color,
  marginBottom,
  marginTop,
  fontVariations,
}) => ({
  userSelect: "none",
  whiteSpace: "nowrap",
  textRendering: "optimizeSpeed",
  marginBottom: `${
    inListView || (!inListView && marginBottom) ? -0.226 : marginBottom
  }em`,
  marginTop: `${
    inListView || (!inListView && marginTop) ? -0.204 : marginTop
  }em`,
  transform: "translateZ(0)",
  willChange: "font-size, font-variation-settings, opacity, filter",
  fontFamily: fontFamily ? fontFamily : "unset",
  extend: [
    {
      condition: color,
      style: {
        color,
      },
    },
    {
      condition: fontVariations,
      style: {
        fontVariationSettings: dictToFontVariationSettings(fontVariations),
      },
    },
  ],
});

const containerRule = ({ inListView }) => ({
  zIndex: -1,
  userSelect: "none",
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
    fontVariations = {},
    fontSize,
  } = props;
  const contentRef = useRef();
  const { marginBottom, marginTop } = useContext(
    FontPreviewMarginsContext
  ).fontPreviewMargins;
  const fontPreviews = useContext(FontPreviewsContext);

  useEffect(() => {
    if (fontPreviews) {
      fontPreviews.current.push(contentRef.current);
    }
  }, []);

  useEffect(() => {
    contentRef.current.style.fontSize = fontSize + "px";
  }, [fontSize]);

  const { css } = useFela({
    inListView,
    color,
    marginTop,
    marginBottom,
    fontVariations,
  });

  return (
    <div className={css(containerRule)}>
      <span ref={contentRef} className={css(itemRule)}>
        {children}
      </span>
    </div>
  );
}

export default React.memo(FontPreview);
