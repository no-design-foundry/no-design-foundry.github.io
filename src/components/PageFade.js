import React, { useEffect, useState } from "react";
import { useFela } from "react-fela";
import { useLocation } from "react-router-dom";

const contentOverlayRule = ({ contentIsVisible, navHeight }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  height: "0px",
  left: 0,
  background: "#ccc",
  transition: `height ${3500}ms`,
  transform: "translateZ(0)",
  willChange: "height",
  transitionTimingFunction: contentIsVisible
    ? "cubic-bezier(.55,0,1,.45)"
    : "cubic-bezier(0,.55,.45,1)",
  height: contentIsVisible ? 0 : `calc(100% - 55px)`,
});

function PageFade(props) {
  const { contentIsVisible = true, navHeight } = props;
  const [currentChildren, setCurrentChildren] = useState(props.children);

  useEffect(() => {
    if (contentIsVisible === true) {
      // setCurrentChildren(props.children);
    }
  }, [contentIsVisible]);

  const { css } = useFela({ contentIsVisible, navHeight });

  return (
    <div>
      <div className={css(contentOverlayRule)}></div>
      {currentChildren}
    </div>
  );
}

export default PageFade;
