import React, { createContext, useContext, useState } from "react";
import FontPreview from "../components/FontPreview";
import FontInputForm from "../components/FontInputForm";
import { Context } from "../App";
import RangeInput from "../components/RangeInput";
import DetailViewDescription from "../components/DetailViewDescription";

export const DetailViewContext = createContext();


function FilterDetailView(props) {
  const {
    title,
    fontIdentifier,
    numberOfLayers,
    layerColors,
    inputs,
    variableFontControlSliders = [],
  } = props;
  const { previewFontSize, setPreviewFontSize, previewStrings } =
    useContext(Context);
  const [showPreviewFont, setShowPreviewFont] = useState(false);
  const [variationSettings, setVariationSettings] = useState({});

  return (
    <DetailViewContext.Provider
      value={{
        showPreviewFont,
        setShowPreviewFont,
        variationSettings,
        setVariationSettings,
      }}
    >
      <FontPreview
        fontSize={previewFontSize}
        showPreviewFont={showPreviewFont}
        variationSettings={variationSettings}
        layerColors={layerColors}
        stuckOnTop={true}
        stuckOnBottom={true}
        numberOfLayers={numberOfLayers}
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
          max="400"
          defaultValue={previewFontSize}
        />
      </FontInputForm>
      <DetailViewDescription>

      </DetailViewDescription>
    </DetailViewContext.Provider>
  );
}

export default React.memo(FilterDetailView);
