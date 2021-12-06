import React, { useContext } from "react";
import { useFela } from "react-fela";
import {
  FontSizeContext,
  FontVariationsContext,
  PreviewedOutputFontsContext,
  PreviewStringsContext,
} from "../App";
import FontPreview from "../components/FontPreview";

const containerRule = ({ navHeight }) => ({
  marginTop: `${navHeight}px`,
});

const descriptionWrapperRule = () => ({
  position: "absolute",
  width: "100vw",
  display: "flex",
  justifyContent: "flex-end",
  // transform: "translateX(-100%)"
});

const descriptionRule = () => ({
  padding: "10px",
  width: "50ch",
  maxWidth: "50vw",
  textAlign: "right"
});

function DetailViewOverlay(props) {
  const { filterIdentifier, navHeight, layerColors } = props;
  const { fontSize } = useContext(FontSizeContext);
  const { previewStrings } = useContext(PreviewStringsContext);
  const { previewedOutputFonts } = useContext(PreviewedOutputFontsContext);
  const { fontVariations } = useContext(FontVariationsContext)
  const { css } = useFela({ navHeight });

  return (
    <div className={css(containerRule)}>
      <div className={css(descriptionWrapperRule)}>
        <p className={css(descriptionRule)}>filter description you can find some interesting information here</p>
      </div>
      <div>
        <FontPreview
          fontFamily={previewedOutputFonts[filterIdentifier][0]}
          fontSize={fontSize}
          fontVariations={fontVariations[filterIdentifier]}
        >
          {previewStrings[filterIdentifier]}
        </FontPreview>
        {/* {layerColors.map((layerColor, index) => (
        ))} */}
      </div>
    </div>
  );
}

export default DetailViewOverlay;
