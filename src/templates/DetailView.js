import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  PreviewedInputFontContext,
  PreviewStringsContext,
  FontPreviewsContext,
} from "../Contexts";
import { useFela } from "react-fela";
import FontPreview from "../components/FontPreview";
import Form from "../components/Form";

export const DetailViewContext = createContext();

const fullscreenRule = () => ({
  minHeight: `100%`,
  top: 0,
  position: "absolute",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  pointerEvents: "none",
  overflow: "hidden",
});

function DetailView(props) {
  const {
    inputs,
    variableFontControlSliders,
    filterIdentifier,
    fontSize,
    setFontSize,
  } = props;
  const { previewedInputFont } = useContext(PreviewedInputFontContext);
  const { previewStrings } = useContext(PreviewStringsContext);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const isMounted = useRef(false);
  const { css } = useFela({ innerHeight });
  const fontPreviews = useContext(FontPreviewsContext);

  function handleOnResize(e) {
    setInnerHeight(window.innerHeight);
  }

  useEffect(() => {
    // new ResizeObserver(()=>{document.body.clientHeight}).observe(document.body)
    isMounted.current = true;
    document.body.style.touchAction = "none";
    window.addEventListener("resize", handleOnResize);
    return () => {
      window.removeEventListener("resize", handleOnResize);
      document.body.style.removeProperty("touch-action");
      isMounted.current = false;
      fontPreviews.current = [];
    };
  }, []);

  return (
    <DetailViewContext.Provider value={{ filterIdentifier }}>
      <div className={css(fullscreenRule)}>
        <FontPreview fontFamily={previewedInputFont} fontSize={fontSize}>
          {previewStrings[filterIdentifier]}
        </FontPreview>
        <Form
          variableFontControlSliders={variableFontControlSliders}
          filterIdentifier={filterIdentifier}
          inputs={inputs}
          fontSize={fontSize}
        />
      </div>
    </DetailViewContext.Provider>
  );
}

export default DetailView;
