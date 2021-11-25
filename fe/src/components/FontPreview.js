import React, { useState, useRef, useContext, useEffect } from "react";
import { useFela } from "react-fela";
import { CursorContext } from "../App";
import { fadeInDuration, navHeight } from "../rules/variables";

const transformTypeRule = () => ({
  transform: `translateY(${-navHeight}px)`,
});

const centerRule = ({ fontSize, inDetailView }) => ({
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

const containerRule = ({ inDetailView }) => ({
  height: `calc(${inDetailView ? 100 : 50}vh - ${navHeight}px)`,
  position: "relative"
});

const foregroundRule = ({ variationSettings }) => ({
  // top: "0px",
  position: "absolute",
  width: "100%",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  fontVariationSettings: Object.keys(variationSettings)
    .map((key) => `"${key}" ${variationSettings[key]}`)
    .join(", "),
});

const fadingRule = ({ fadingOut }) => ({
  opacity: 1,
  transitionProperty: "opacity, filter",
  transitionDuration: `${fadeInDuration}ms`,
  transitionTimingFunction: "ease-in",
  filter: "blur(0)",
  extend: {
    condition: fadingOut,
    style: {
      filter: "blur(.02em)",
      opacity: 0,
    },
  },
});

function FontPreview(props) {
  const container = useRef();
  const {
    fontSize,
    showPreviewFont,
    children,
    layerColors,
    fadingOut = false,
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
    fontSize,
    showMobilePreview,
    variationSettings,
    showPreviewFont,
    fadingOut
  });

  return (
    <div ref={container} className={css(containerRule)}>
      <div className={css(foregroundRule)} style={{ height: `${overlayTop}px`}}>
        {[...Array(numberOfLayers)].map((_, index) => (
          <div
            className={css(centerRule, transformTypeRule, fadingRule, () => ({
              color: layerColors[index],
              fontFamily: `preview-output-font--${index}`
            }))}
          >
            {children}
          </div>
        ))}
      </div>
      <div className={css(foregroundRule)} style={{ top: `${overlayTop}px`, bottom: "0px"}}>
        <div
          className={css(
            centerRule, 
            transformTypeRule, 
            fadingRule, 
            () => ({
              zIndex: -100,
              bottom: `-${navHeight}px`,
              fontFamily: "preview-input-font"
            }))
          }>
          {children}
        </div>
      </div>
    </div>
  );
}

export default FontPreview;
