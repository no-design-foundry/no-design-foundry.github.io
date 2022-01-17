import React, { useEffect, useState, useRef, useContext } from "react";
import { useFela } from "react-fela";
import { dictToFontVariationSettings } from "../misc";
import { FontPreviewMarginsContext } from "../Contexts";

export const fontPreviewOpacityTransition = 350;

const itemRule = ({ previewedFontFamily, inListView, visible, color, marginBottom, marginTop }) => ({
  userSelect: "none",
  padding: "10px",
  transitionDuration: `${fontPreviewOpacityTransition}ms`,
  transitionProperty: "opacity, filter",
  transitionTimingFunction: "ease-in",
  whiteSpace: "nowrap",
  textRendering: "optimizeSpeed",
  marginBottom: `${(inListView || (!inListView && marginBottom)) ? -0.226 : marginBottom}em`,
  marginTop: `${(inListView || (!inListView && marginTop))? -0.204 : marginTop}em`,
  transform: "translateZ(0)",
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
  pointerEvents: "none",
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
    fontSize,
    inListView = false,
    fontFamily,
    fontVariations = {},
    color,
  } = props;
  const contentRef = useRef();
  const [visible, setVisible] = useState(false);
  const [previewedFontFamily, setPreviewedFontFamily] = useState(fontFamily);
  const [previewedChildren, setPreviewedChildren] = useState(props.children);
  const { marginBottom, marginTop } = useContext(FontPreviewMarginsContext).fontPreviewMargins;

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (fontFamily !== previewedFontFamily) {
      setVisible(false);
      setTimeout(() => {
        setPreviewedFontFamily(fontFamily);
        setPreviewedChildren(props.children);
        setVisible(true);
      }, fontPreviewOpacityTransition + 50);
    }
  }, [fontFamily]);

  const { css } = useFela({
    visible,
    inListView,
    previewedFontFamily,
    color,
    fontVariations,
    marginTop,
    marginBottom
  });

  return (
    <div className={css(containerRule)}>
      <span
        ref={contentRef}
        className={css(itemRule)}
        style={{ ...dictToFontVariationSettings(fontVariations), fontSize: `${fontSize}px`}}
      >
        {previewedChildren}
      </span>
    </div>
  );
}

export default FontPreview;
