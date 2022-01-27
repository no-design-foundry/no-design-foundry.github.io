import React, {useEffect, useState} from "react";
import { useFela } from "react-fela";

export const fontPreviewOpacityTransition = 350;

const layerRule = ({ visible, fontFamily, color }) => ({
  // position: "absolute",
  lineHeight: 0,
  transitionDuration: `${fontPreviewOpacityTransition}ms`,
  transitionTimingFunction: "ease-in",
  transitionProperty: "opacity, filter",
  opacity: visible ? 1 : 0,
  fontFamily,
  color,
});

function Layer(props) {
  const { fontFamily, children, color } = props;
  const [previewedFontFamily, setPreviewedFontFamily] = useState(null)
  const [previewedChildren, setPreviewedChildren] = useState(children)
  const [visible, setVisible] = useState(false);


  useEffect(()=>{
    setVisible(true);
    return () => {
      setVisible(false)
    }
  }, [])

  useEffect(() => {
    setVisible(false)
    setTimeout(() => {
      setPreviewedFontFamily(fontFamily)
      setPreviewedChildren(children)
    }, fontPreviewOpacityTransition)
  }, [fontFamily, children])

  useEffect(() => {
    setTimeout(()=>{
      setVisible(true)
    }, 100)
  }, [previewedFontFamily, previewedChildren])

  const { css } = useFela({ visible, fontFamily: previewedFontFamily, color });
  return <div className={css(layerRule)}>{previewedChildren}</div>
}

export default React.memo(Layer);
