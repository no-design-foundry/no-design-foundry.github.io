import React, { createContext, useContext, useRef, useState } from "react";
import FontPreview from "../components/FontPreview";
import FontInputForm from "../components/FontInputForm";
import { Context } from "../App";
import RangeInput from "../components/RangeInput";
import DetailViewDescription from "../components/DetailViewDescription";
import GetFontForm from "../components/GetFontForm";
import { useFela } from "react-fela";
import { background } from "../rules/variables";
import TextInput from "../components/TextInput";
import { padding } from "../rules/generic";
import AnimateHeight from "react-animate-height";

export const DetailViewContext = createContext();

const formsWrapper = () => ({
  position: "absolute",
  bottom: 0,
  left: 0,
})

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
  const [fadingOut, setFadingOut] = useState(false)
  const [getFormVisible, setGetFormVisible] = useState(false)
  const {css} = useFela()

  function handleGetFormVisible() {
    setGetFormVisible(true)
  }

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
        fadingOut={fadingOut}
      >
        {previewStrings[fontIdentifier]}
      </FontPreview>
      <div className={css(formsWrapper, padding("10px"))}>
      <FontInputForm
        title={title}
        inputs={inputs}
        fontIdentifier={fontIdentifier}
        setFadingOut={setFadingOut}
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
      <AnimateHeight height={getFormVisible ? "auto" : "auto"}>
        <button onClick={handleGetFormVisible}>get</button>
      </AnimateHeight>
      </div>
      <GetFontForm visible={getFormVisible}>
      </GetFontForm>
      <DetailViewDescription>

      </DetailViewDescription>
    </DetailViewContext.Provider>
  );
}

export default React.memo(FilterDetailView);
