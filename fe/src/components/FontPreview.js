import React, { useState, useRef, useContext, useEffect } from "react";
import { useFela } from "react-fela";
import { CursorContext } from "../App";
import { navHeight } from "../rules/variables";

const transformTypeRule = () => ({
  transform: `translateY(${-navHeight}px)`,
});

const centerRule = ({fontSize, inDetailView}) => ({
  fontSize: `${fontSize}px`,
  position: "absolute",
  height: `${inDetailView ? 100 : 50}vh`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  userSelect: "none",
  textAlign: "center",
});

const containerRule = ({inDetailView}) => ({
  height: `calc(${inDetailView ? 100 : 50}vh - ${navHeight}px)`,
});

const foregroundRule = ({ overlayTop, variationSettings }) => ({
  color: "pink",
  background: "#EEE",
  position: "absolute",
  width: "100%",
  height: `${overlayTop}px`,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  fontVariationSettings: 
    Object.keys(variationSettings)
    .map((key) => `"${key}" ${variationSettings[key]}`)
    .join(", "),
});

const backgroundRule = ({showPreviewFont}) => ({
  display: "flex",
  justifyContent: "center",
  extend: {
    condition: showPreviewFont,
    style: {
      fontFamily: "preview-input-font"
    }
  }
});

const backgroundChildRule = () => ({
  zIndex: -100,
});

function FontPreview(props) {
  const container = useRef();
  const {
    fontSize,
    showPreviewFont,
    children,
    layerColors,
    inDetailView = true,
    numberOfLayers = 1,
    variationSettings = {},
  } = props;
  const cursorY = useContext(CursorContext);
  const [containerHeight, setContainerHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [overlayTop, setOverlayTop] = useState(0);
  const [showMobilePreview] = useState(false);

  function updateRect() {
    const { top: bodyTop } = document.body.getBoundingClientRect();
    const { top: containerTop, height: containerHeight } =
      container.current.getBoundingClientRect();
    setTop(containerTop - bodyTop);
    setContainerHeight(containerHeight);
  }

  useEffect(() => {
    updateRect();
    document.addEventListener("resize", updateRect);
    return () => {
      document.removeEventListener("resize", updateRect);
    };
  }, []);

  useEffect(() => {
    if (cursorY <= top) {
      setOverlayTop(0);
    } else if (cursorY >= top + containerHeight) {
      setOverlayTop(containerHeight);
    } else {
      setOverlayTop(cursorY - top);
    }
  }, [top, containerHeight, cursorY]);

  const { css } = useFela({
    inDetailView,
    overlayTop,
    fontSize,
    showMobilePreview,
    variationSettings,
    showPreviewFont
  });

  return (
    <div ref={container} className={css(containerRule)}>
      <div className={css(foregroundRule)}>
        {[...Array(numberOfLayers)].map((_, index) => (
          <div
            className={css(centerRule, transformTypeRule, () => ({
              color: layerColors[index],
              fontFamily: `preview-output-font--${index}`,
            }))}
          >
            {children}
          </div>
        ))}
      </div>
      <div className={css(backgroundRule)}>
        <div
          className={css(centerRule, backgroundChildRule, transformTypeRule)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default FontPreview;
