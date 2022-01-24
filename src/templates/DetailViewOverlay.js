import React, { useContext } from "react";
import { useFela } from "react-fela";
import {
  FontVariationsContext,
  PreviewedOutputFontsContext,
  PreviewStringsContext,
} from "../Contexts";
import FontPreview from "../components/FontPreview";
import Layer from "../components/Layer";

const containerRule = ({ navHeight }) => ({
  marginTop: `${navHeight}px`,
});

function DetailViewOverlay(props) {
  const { filterIdentifier, navHeight, layerColors, formHeight, fontSize } = props;
  const { previewStrings } = useContext(PreviewStringsContext);
  const { previewedOutputFonts } = useContext(PreviewedOutputFontsContext);
  const { fontVariations } = useContext(FontVariationsContext);
  const { css } = useFela({ navHeight });

  return (
    <div className={css(containerRule)}>
      {/* {layerColors.map((layerColor, index) => ( */}
      <FontPreview
        key={`${filterIdentifier}-overlay`}
        fontVariations={fontVariations[filterIdentifier]}
        formHeight={formHeight}
        layerColors={layerColors}
        fontSize={fontSize}
      >
        {layerColors.map((color, index) => (
          <Layer
            key={`${filterIdentifier}-overlay-layer-${index}`}
            fontFamily={
              previewedOutputFonts[filterIdentifier][index] ||
              `${filterIdentifier}-${index}`
            }
            color={color}
          >
            {previewStrings[filterIdentifier]}
          </Layer>
        ))}
      </FontPreview>
    </div>
  );
}

export default DetailViewOverlay;
