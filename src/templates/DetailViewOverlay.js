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


function DetailViewOverlay(props) {
  const { filterIdentifier, navHeight, layerColors } = props;
  const { fontSize } = useContext(FontSizeContext);
  const { previewStrings } = useContext(PreviewStringsContext);
  const { previewedOutputFonts } = useContext(PreviewedOutputFontsContext);
  const { fontVariations } = useContext(FontVariationsContext)
  const { css } = useFela({ navHeight });

  return (
    <div className={css(containerRule)}>
      <div>
        {layerColors.map((layerColor, index) => (
        <FontPreview 
          key={`${filterIdentifier}-overlay-${index}`}
          fontFamily={previewedOutputFonts[filterIdentifier][index] || `${filterIdentifier}-${index}`}
          fontSize={fontSize}
          fontVariations={fontVariations[filterIdentifier]}
          color={layerColor}
        >
          {previewStrings[filterIdentifier]}
        </FontPreview>
        ))}
      </div>
    </div>
  );
}

export default DetailViewOverlay;
