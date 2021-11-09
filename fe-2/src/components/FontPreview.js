import React, { useState, useRef, useContext, useEffect } from "react";
import { useFela } from "react-fela";
import { CursorContext } from "../App";

const flexCenter = {
  display: "flex",
  justifyContent: "center",
};

const rule = ({
  fontSize,
  showPreviewFont,
  inDetailView,
  variationSettings,
}) => ({
  fontSize: `${fontSize}px`,
  height: "200px",
  position: "relative",
  width: "100%",
  cursor: "ns-resize",
  overflow: "hidden",
  alignItems: "center",
  fontDisplay: "swap",
  ...flexCenter,
  extend: [
    {
      condition: showPreviewFont && inDetailView,
      style: {
        fontFamily: "preview-output-font",
      },
    },
    {
      condition: Object.keys(variationSettings).length > 0,
      style: {
        fontVariationSettings: Object.keys(variationSettings)
          .map((key) => `"${key}" ${variationSettings[key]}`)
          .join(","),
      },
    },
  ],
});

const overlayRule = ({
  cursorY,
  inDetailView,
  showPreviewFont,
  showPreview,
}) => ({
  position: "absolute",
  left: 0,
  "@media (hover:hover)": {
    top: `${cursorY}px`,
    "> *": {
      marginTop: `${-cursorY}px`,
    },
  },
  ":after": {
    content: '""',
    position: "absolute",
    width: "100%",
    borderTop: "1px solid black",
    top: 0,
  },
  background: "white",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  fontDisplay: "block",
  ...flexCenter,
  "@media (hover:none)": {
    top: "0",
    extend: {
      condition: inDetailView,
      style: {
        marginLeft: "-100%",
        transition: "margin-left .2s ease-in",
        "> *": {
          transition: "margin-left .2s ease-in",
          marginLeft: "200%",
        },
        extend: {
          condition: showPreview,
          style: {
            marginLeft: "0",
            "> *": {
              marginLeft: "0",
            },
          },
        },
      },
    },
  },
  "> * ": {
    height: "100%",
    alignItems: "center",
    ...flexCenter,
  },
  extend: {
    condition: showPreviewFont && inDetailView,
    style: {
      fontFamily: "preview-input-font",
    },
  },
});

const animationRule = ({ isEven }) => ({
  "@media (hover:none)": {
    animationName: {
      from: { marginLeft: "-100%" },
      to: { marginLeft: "100%" },
    },
    animationDuration: "2s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDirection: isEven ? "alternate" : "alternate-reverse",
    "> *": {
      animationName: {
        from: { marginLeft: "200%" },
        to: { marginLeft: "-200%" },
      },
      animationDuration: "2s",
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
      animationDirection: "alternate",
      animationDirection: isEven ? "alternate" : "alternate-reverse",
    },
  },
});

const compareButtonRule = ({}) => ({
  "@media (hover:hover)": {
    display: "none",
  },
  display: "flex",
  justifyContent: "flex-end",
});

function FontPreview(props) {
  const container = useRef();
  const {
    fontSize,
    showPreviewFont,
    children,
    isEven,
    inDetailView = true,
    variationSettings = {},
    stuckOnTop = false,
    stuckOnBottom = false
  } = props;
  const cursorY = useContext(CursorContext);
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [overlayTop, setOverlayTop] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  function updateRect() {
    const { top: bodyTop } = document.body.getBoundingClientRect();
    const { top: containerTop, height: containerHeight } =
      container.current.getBoundingClientRect();
    setTop(containerTop - bodyTop);
    setHeight(containerHeight);
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
      setOverlayTop(stuckOnTop ? "0" : null);
    } else if (cursorY >= top + height) {
      setOverlayTop(stuckOnBottom ? height - 1 : null);
    } else {
      setOverlayTop(cursorY - top);
    }
  }, [top, height, cursorY]);

  const { css } = useFela({
    cursorY: overlayTop,
    fontSize,
    isEven,
    inDetailView,
    showPreview,
    showPreviewFont,
    variationSettings,
  });

  return (
    <>
      <div ref={container} className={css(rule)}>
        <div>{children}</div>
        {console.log(overlayTop)}
        {
          overlayTop &&
        <div
          className={css(overlayRule, inDetailView ? () => {} : animationRule)}
        >
          <div>{children}</div>
          </div>
        }
      </div>
      {inDetailView && (
        <div
          className={css(compareButtonRule)}
          onClick={() => setShowPreview(!showPreview)}
        >
          compare
        </div>
      )}
    </>
  );
}

export default FontPreview;
