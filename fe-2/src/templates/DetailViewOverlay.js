import React, { useContext } from "react";
import { useFela } from "react-fela";
import {
  FontSizeContext,
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
  const { filterIdentifier, navHeight } = props;
  const { fontSize } = useContext(FontSizeContext);
  const { previewStrings } = useContext(PreviewStringsContext);
  const { css } = useFela({ navHeight });
  return (
    <div className={css(containerRule)}>
      <div className={css(descriptionWrapperRule)}>
        <p className={css(descriptionRule)}>This is filter description</p>
      </div>
      <div style={{ fontFamily: "times" }}>
        <FontPreview fontSize={fontSize}>
          {previewStrings[filterIdentifier]}
        </FontPreview>
      </div>
    </div>
  );
}

export default DetailViewOverlay;
