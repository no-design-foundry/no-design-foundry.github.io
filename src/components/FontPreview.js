import React, { useEffect, useState, useRef } from "react";
import { useFela } from "react-fela";

const opacityTransition = 350;

const overlayItemRule = ({ previewedFontFamily, visible, color }) => ({
  userSelect: "none",
  // position: "absolute",
  // transform: "translate(-50%, -50%)",
  transitionDuration: `${opacityTransition}ms`,
  transitionProperty: "opacity, filter",
  transitionTimingFunction: "ease-in",
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
        color
      }
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

const contentRule = () => ({
  whiteSpace: "nowrap",
  transform: "translateZ(0)"
})

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
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  flexGrow: 1,
  extend: [
    {
      condition: inListView,
      style: {
        alignItems: "flex-start",
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
    onMount
  } = props;
  const didMount = useRef(false);
  const contentRef = useRef();
  const [visible, setVisible] = useState(true);
  const [previewedFontFamily, setPreviewedFontFamily] = useState(fontFamily);
  const [previewedChildren, setPreviewedChildren] = useState(props.children);

  useEffect(() => {
    if (!didMount.current && onMount) {
      onMount(contentRef.current.offsetWidth)
      didMount.current = true
    }    
  }, [fontSize, onMount])

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

  const { css } = useFela({ visible, inListView, previewedFontFamily, color });
  return (
    <div className={css(containerRule)} style={{ fontSize: `${fontSize}px` }}>
      <div>
        <div className={css(overlayItemRule)}>
          <span
            ref={contentRef}
            className={css(contentRule)}
            style={{
              fontVariationSettings: Object.keys(fontVariations)
                .map((key) => `"${key}" ${fontVariations[key]}`)
                .join(", "),
            }}
          >
            {previewedChildren}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FontPreview;
