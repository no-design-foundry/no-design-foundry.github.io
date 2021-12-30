import React, { useEffect, useState, useRef } from "react";
import { useFela } from "react-fela";

const opacityTransition = 350;

const itemRule = ({
  previewedFontFamily,
  visible,
  color,
  inListView,
  formHeight,
}) => ({
  userSelect: "none",
  padding: "10px",
  transitionDuration: `${opacityTransition}ms`,
  transitionProperty: "opacity, filter",
  transitionTimingFunction: "ease-in",
  whiteSpace: "nowrap",
  textRendering: "optimizeSpeed",
  marginTop: `${-formHeight/2}px`,
  "@media(hover:none)": {
    marginTop: `${-formHeight}px `
  },
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
    {
      condition: inListView,
      style: {
        fontVariationSettings: '"RTTX" 150',
      },
    },
  ],
});

const containerRule = ({ inListView, formHeight }) => ({
  zIndex: -1,
  userSelect: "none",
  pointerEvents: "none",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  // marginTop: "25px",
  overflow: "hidden",
  // height: "100%",
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
    {
      condition: !inListView && !formHeight,
      style: {
        visibility: "hidden",
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
    formHeight,
  } = props;
  const contentRef = useRef();
  const [visible, setVisible] = useState(true);
  const [previewedFontFamily, setPreviewedFontFamily] = useState(fontFamily);
  const [previewedChildren, setPreviewedChildren] = useState(props.children);

  useEffect(() => {
    if (fontFamily !== previewedFontFamily) {
      setVisible(false);
      setTimeout(() => {
        setPreviewedFontFamily(fontFamily);
        setPreviewedChildren(props.children);
        setVisible(true);
      }, opacityTransition + 50);
    }
  }, [fontFamily]);

  const { css } = useFela({
    visible,
    inListView,
    previewedFontFamily,
    color,
    formHeight,
  });

  return (
    <div className={css(containerRule)} style={{ fontSize: `${fontSize}px` }}>
      <span
        ref={contentRef}
        className={css(itemRule)}
        style={{
          fontVariationSettings: Object.keys(fontVariations)
            .map((key) => `"${key}" ${fontVariations[key]}`)
            .join(", "),
        }}
      >
        {previewedChildren}
      </span>
    </div>
  );
}

export default FontPreview;
