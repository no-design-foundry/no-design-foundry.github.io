import React, { useState, useRef, useContext, useEffect } from "react";
import { useFela } from "react-fela";
import { CursorContext } from "../App";
import { padding, margin, height } from "../rules/generic";
import { background } from "../rules/variables";
import { NavHeightContext } from "../App";



const flexCenter = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
};

const rule = ({
  fontSize,
  showPreviewFont,
  inDetailView,
  variationSettings,
  height
}) => ({
  background,
  fontSize: `${fontSize}px`,
  position: "relative",
  width: "100%",
  cursor: "ns-resize",
  overflow: "hidden",
  alignItems: "center",
  fontDisplay: "swap",
  ...flexCenter,
  height,
  // userSelect: "none",
  extend: [
    {
      condition: !inDetailView,
      style: {
        height: "300px",
      }
    },
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
    // borderTop: "1px solid black",
    top: 0,
  },
  background: "white",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  fontDisplay: "block",
  ...flexCenter,
  // "@media (hover:none)": {
  //   top: "0",
  //   extend: {
  //     condition: inDetailView,
  //     style: {
  //       marginLeft: "-100%",
  //       transition: "margin-left .2s ease-in",
  //       "> *": {
  //         transition: "margin-left .2s ease-in",
  //         marginLeft: "200%",
  //       },
  //       extend: {
  //         condition: showPreview,
  //         style: {
  //           marginLeft: "0",
  //           "> *": {
  //             marginLeft: "0",
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
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

// const animationRule = ({ isEven }) => ({
//   "@media (hover:none)": {
//     animationName: {
//       from: { marginLeft: "-100%" },
//       to: { marginLeft: "100%" },
//     },
//     animationDuration: "2s",
//     animationTimingFunction: "ease-in-out",
//     animationIterationCount: "infinite",
//     animationDirection: isEven ? "alternate" : "alternate-reverse",
//     "> *": {
//       animationName: {
//         from: { marginLeft: "200%" },
//         to: { marginLeft: "-200%" },
//       },
//       animationDuration: "2s",
//       animationTimingFunction: "ease-in-out",
//       animationIterationCount: "infinite",
//       animationDirection: "alternate",
//       animationDirection: isEven ? "alternate" : "alternate-reverse",
//     },
//   },
// });

const heightRule = ({navHeight}) => ({
  height: `calc(100vh - ${navHeight}px)`
})

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
    inDetailView = true,
    variationSettings = {},
  } = props;
  const cursorY = useContext(CursorContext);
  const navHeight = useContext(NavHeightContext);
  const [containerHeight, setContainerHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [overlayTop, setOverlayTop] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  console.log("navHeight", navHeight)
  const height = "calc(100vh - " + navHeight + "px)"
  const { css } = useFela({
    inDetailView,
    cursorY: overlayTop,
    fontSize,
    showPreview,
    showPreviewFont,
    variationSettings,
    height
  });

  function updateRect() {
    const { top: bodyTop } = document.body.getBoundingClientRect();
    const { top: containerTop, height: containerHeight } =
      container.current.getBoundingClientRect();
    setTop(containerTop - bodyTop);
    setContainerHeight(containerHeight);
    console.log(containerTop - bodyTop, containerHeight, inDetailView)
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
  }, [top, containerHeight, cursorY, navHeight]);

  return (
    <>
      <div ref={container} className={css(rule)}>
        <div className={css(padding("10px"))}>{children}</div>
        <div className={css(overlayRule)}>
          <div className={css(padding("10px"))}>{children}</div>
        </div>
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
