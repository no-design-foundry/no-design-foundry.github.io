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
  display: "flex",
  justifyContent: "flex-end",
});

const descriptionRule = () => ({
  padding: "10px",
  maxWidth: "72ch",
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
        <p className={css(descriptionRule)}>This is filter description</p>
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
