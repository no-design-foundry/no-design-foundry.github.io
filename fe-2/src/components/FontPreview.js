import React, { useEffect, useState } from "react";
import { useFela } from "react-fela";

const opacityTransition = 350
const overlayItemRule = ({previewedFontFamily, visible}) => ({
  userSelect: "none",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  transitionDuration: `${opacityTransition}ms`,
  transitionProperty: "opacity, filter",
  transitionTimingFunction: "ease-in",
  extend: [{
    condition: previewedFontFamily,
    style: {
      fontFamily: previewedFontFamily
    }
  },
  {
    condition: !visible, 
    style: {
      opacity: 0,
      filter: "blur(.025em)"
    }
  }
]
});

const containerRule = ({inListView}) => ({
  zIndex: -1,
  userSelect: "none",
  pointerEvents: "none",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  extend: [
    {
      condition: inListView,
      style: {
        height: "45vh"
      }
    }
  ]
});

function FontPreview(props) {
  const { fontSize, inListView = false, fontFamily } = props;
  const [visible, setVisible] = useState(true)
  const [previewedFontFamily, setPreviewedFontFamily] = useState(fontFamily)
  const [previewedChildren, setPreviewedChildren] = useState(props.children)

  useEffect(() => {
    if (fontFamily !== previewedFontFamily) {
      setVisible(false)
      setTimeout(() => {
        setPreviewedFontFamily(fontFamily)
        setPreviewedChildren(props.children)
        setVisible(true)
      }, opacityTransition + 50)
    }
  }, [fontFamily])
  
  const { css } = useFela({visible, inListView, previewedFontFamily});
  return (
    <div className={css(containerRule)} style={{ fontSize: `${fontSize}px` }}>
      <div>
        <div className={css(overlayItemRule)}><span>{previewedChildren}</span></div>
      </div>
    </div>
  );
}

export default FontPreview;
