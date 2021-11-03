import React, { useState, useRef } from "react"
import { useFela } from "react-fela"

const flexCenter = {
    display: "flex",
    justifyContent: "center",
}

const rule = ({ fontSize }) => ({
  fontSize: `${fontSize}px`,
  height: "200px",
  position: "relative",
  width: "100%",
  cursor: "ns-resize",
  overflow: "hidden",
  alignItems: "center",
  ...flexCenter
})

const overlayRule = ({ cursorY }) => ({
  position: "absolute",
  top: `${cursorY}px`,
  left: 0,
  fontFamily: "Verdana",
  background: "silver",
  // color: "",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  ...flexCenter,
  "> * ": {
      height: "100%",
      marginTop: `${-cursorY}px`,
      ...flexCenter,
      alignItems: "center"
  }
})

function FontPreview(props) {
  let isTouching = false
  const { children, fontSize } = props
  const container = useRef()
  const [cursorY, setCursorY] = useState(0)
  const { css } = useFela({ fontSize, cursorY })

  function handleOnMouseMove(e) {
    if (!isTouching) {
      const {top} = container.current.getBoundingClientRect()
      setCursorY(e.pageY - top)
    }
  }

  function handleOnMouseLeave(e) {
      const {top, bottom, height} = container.current.getBoundingClientRect()
      if (e.clientY >= bottom ) {
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
    <div ref={container} className={css(rule)} onMouseMove={handleOnMouseMove} onMouseLeave={handleOnMouseLeave} onTouchStart={handleOnTouchStart} onTouchEnd={handleOnTouchEnd}>
      <div>{children}</div>
      <div className={css(overlayRule)}><div>{children}</div></div>
    </div>
  )
}

export default FontPreview
