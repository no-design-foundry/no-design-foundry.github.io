import React, { useContext } from "react";
import { useFela } from "react-fela";
import {
  FontSizeContext,
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
  const { css } = useFela({ navHeight });
  const { previewedOutputFonts } = useContext(PreviewedOutputFontsContext);

  return (
    <div className={css(containerRule)}>
      <div className={css(descriptionWrapperRule)}>
        <p className={css(descriptionRule)}>This is filter description</p>
      </div>
      <div>
        <FontPreview
          // key={`overlay-font-preview-${0}`}
          fontFamily={previewedOutputFonts[filterIdentifier][0]}
          fontSize={fontSize}
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
