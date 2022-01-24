import React from "react";
import { useFela } from "react-fela";

const layerRule = ({ fontFamily, color }) => ({
  // position: "absolute",
  lineHeight: 0,

  // transform: "translateX(-50%)",
  fontFamily,
  color,
});

function Layer(props) {
  const { fontFamily, children, color } = props;
  const { css } = useFela({ fontFamily, color });
  return <div className={css(layerRule)}>{children}</div>
}

export default React.memo(Layer);
