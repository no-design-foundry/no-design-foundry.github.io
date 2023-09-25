import React, { useContext, useEffect } from "react";
import { useFela } from "react-fela";
import { Controller, useForm } from "react-hook-form";
import FontPreview from "../components/FontPreview";
import FilterContext from "../contexts/FilterContext";
import OutputFontContext from "../contexts/OutputFontContext";

const wrapperRule = () => ({
  position: "absolute",
  zIndex: -1,
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  userSelect: "none",
  overflow: "hidden"
});

const previewRule = () => ({
  position: "absolute",
  display: "inline-block",
});


function Detail() {
  const { identifier } = useContext(FilterContext);
  const { previewStrings, previewRef } = useContext(OutputFontContext);
  const { title } = useContext(FilterContext);
  const { css } = useFela();
  const {register} = useForm()

  const { onChange, onBlur, name, ref } = register(`${identifier}-identifier`, {keepValues: true, keepDirty: true, keepDefaultValues: true}); 

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      select: {}
    }
  });

  return (
    <div className={css(wrapperRule)} data-font-preview>
      <FontPreview className={css(previewRule)}>
        {previewStrings?.[identifier] ?? title}
      </FontPreview>
    </div>
  );
}

export default Detail;
