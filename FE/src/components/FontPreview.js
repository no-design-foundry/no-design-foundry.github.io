import React, { useState, useRef } from "react"
import { useFela } from "react-fela"

const flexCenter = {
  display: "flex",
  justifyContent: "center",
}

const rule = ({ fontSize, inDetailView }) => ({
  fontSize: `${fontSize}px`,
  height: "200px",
  position: "relative",
  fontFamily: "previewFont",
  width: "100%",
  cursor: "ns-resize",
  overflow: "hidden",
  alignItems: "center",
  ...flexCenter,
})

const overlayRule = ({ cursorY, inDetailView, showPreview }) => ({
  position: "absolute",
  top: `${cursorY}px`,
  left: 0,
  background: "silver",
  fontFamily: "Verdana",
  overflow: "hidden",
  width: "100%",
  height: "100%",
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
              marginLeft: "0"
            }
          },
        },
      },
    },
  },
  "> * ": {
    height: "100%",
    marginTop: `${-cursorY}px`,
    alignItems: "center",
    ...flexCenter,
  },
})

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
})

const compareButtonRule = ({}) => ({
  "@media (hover:hover)": {
    display: "none"
  },
  display: "flex",
  justifyContent: "flex-end"
})

function FontPreview(props) {
  let isTouching = false
  const { children, fontSize, isEven, inDetailView = true } = props
  const container = useRef()
  const [cursorY, setCursorY] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const { css } = useFela({
    fontSize,
    cursorY,
    isEven,
    inDetailView,
    showPreview,
  })

  function handleOnMouseMove(e) {
    if (!isTouching) {
      const { top } = container.current.getBoundingClientRect()
      setCursorY(e.pageY - top)
    }
  }

  function handleOnMouseLeave(e) {
    const { top, bottom, height } = container.current.getBoundingClientRect()
    if (e.clientY >= bottom) {
      setCursorY(height)
    }
    if (e.clientY <= top) {
      setCursorY(0)
    }
  }

  function handleOnTouchStart(e) {
    isTouching = true
  }

  function handleOnTouchEnd(e) {
    setTimeout(() => {
      isTouching = false
    }, 10)
  }

  return (
    <>
      <div
        ref={container}
        className={css(rule)}
        onMouseMove={handleOnMouseMove}
        onMouseLeave={handleOnMouseLeave}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={handleOnTouchEnd}
      >
        <div>{children}</div>
        <div
          className={css(overlayRule, inDetailView ? () => {} : animationRule)}
        >
          <div>{children}</div>
        </div>
      </div>
      {inDetailView && (
        <div className={css(compareButtonRule)} onClick={() => setShowPreview(!showPreview)}>compare</div>
      )}
    </>
  )
}

export default FontPreview
