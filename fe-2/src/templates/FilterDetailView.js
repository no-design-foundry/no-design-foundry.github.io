import React, { createContext, useContext, useState } from "react";
import FontControlSlider from "../components/FontControlSlider";
import FontPreview from "../components/FontPreview";
import FontInputForm from "../components/FontInputForm";
import { useFela } from "react-fela";
import { Context } from "../App";
import data from "../data";

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
    <DetailViewContext.Provider value={{ showPreviewFont, setShowPreviewFont, variationSettings }}>
      <main className={css(rule)}>
        <FontPreview
          fontSize={previewFontSize}
          showPreviewFont={showPreviewFont}
        >
          {previewStrings[fontIdentifier]}
        </FontPreview>
        <FontInputForm
          title={title}
          inputs={inputs}
          fontIdentifier={fontIdentifier}
        >
          {variableFontControlSliders.map((slider, index) => (
            <FontControlSlider
              onChange={(e) => {
                let value = {}
                value[slider.tag] = e.target.value
                setVariationSettings({...variationSettings, ...value});
              }}
              key={`fontControlSlider_${index}`}
              title={slider.title}
              min={slider.min}
              max={slider.max}
              defaultValue={slider.default}
              animatable={true}
            />
          ))}
          <FontControlSlider
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

export default FilterDetailView;
