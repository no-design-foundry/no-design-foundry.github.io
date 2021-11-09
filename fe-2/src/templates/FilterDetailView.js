import React, { createContext, useContext, useState } from "react";
import FontPreview from "../components/FontPreview";
import FontInputForm from "../components/FontInputForm";
import { useFela } from "react-fela";
import { Context } from "../App";
import data from "../data";
import RangeInput from "../components/RangeInput";

export const DetailViewContext = createContext();

const rule = () => ({
  display: "flex",
  flexDirection: "column",
});

function FilterDetailView(props) {
  const {
    title,
    fontIdentifier,
    inputs,
    variableFontControlSliders = [],
  } = props;
  const { previewFontSize, setPreviewFontSize, previewStrings } =
    useContext(Context);
  const { css } = useFela();
  const [showPreviewFont, setShowPreviewFont] = useState(false);
  const [variationSettings, setVariationSettings] = useState({});

  return (
    <DetailViewContext.Provider value={{ showPreviewFont, setShowPreviewFont, variationSettings, setVariationSettings }}>
      <main className={css(rule)}>
        <FontPreview
          fontSize={previewFontSize}
          showPreviewFont={showPreviewFont}
          variationSettings={variationSettings}
          stuckOnTop={true}
          stuckOnBottom={true}
        >
          {previewStrings[fontIdentifier]}
        </FontPreview>
        <FontInputForm
          title={title}
          inputs={inputs}
          fontIdentifier={fontIdentifier}
        >
          {variableFontControlSliders.map((slider, index) => (
            <RangeInput
              key={`fontControlSlider_${index}`}
              title={slider.title}
              min={slider.min}
              max={slider.max}
              defaultValue={slider.default}
              animatable={true}
              tag={slider.tag}
            />
          ))}
          <RangeInput
            onChange={(e) => setPreviewFontSize(e.target.value)}
            title="size"
            min="10"
            max="200"
            defaultValue={previewFontSize}
          />
        </FontInputForm>
      </main>
    </DetailViewContext.Provider>
  );
}

export default React.memo(FilterDetailView);
