import React from "react";
import { useFela } from "react-fela";

const overlayItemRule = () => ({
  position: "absolute",
  transform: "translate(-50%, -50%)",
});

const containerRule = () => ({
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
  zIndex: -1,
});

function FontPreview(props) {
  const { fontSize } = props;
  const { css } = useFela();
  return (
    <div className={css(containerRule)} style={{ fontSize: `${fontSize}px` }}>
      <div>
        <div className={css(overlayItemRule)}><span>{props.children}</span></div>
      </div>
      <div>
        {/* <div className={css(overlayItemRule)}>{props.children}</div>
        <div className={css(overlayItemRule)}>{props.children}</div> */}
      </div>
    </div>
  );
}

export default FontPreview;
