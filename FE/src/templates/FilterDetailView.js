import React, { useState } from "react"
import FontControlSlider from "../components/FontControlSlider"
import FontPreview from "../components/FontPreview"
import FontInputForm from "../components/FontInputForm"
import { useFela } from "react-fela"
import Nav from "../components/Nav"
import formRule from "../rules/formRule"


const rule = () => ({
  display: "flex",
  flexDirection: "column",
})

function FilterDetailView(props) {
  const { css } = useFela()
  const { title, fontIdentifier, inputs, websiteContext } = props
  const [previewFontSize, setPreviewFontSize] = useState()
  return (
    <>
      <Nav websiteContext={websiteContext}></Nav>
      <main className={css(rule)}>
        <FontPreview fontSize={previewFontSize}>{title}</FontPreview>
        <div className={css(formRule)}>
          <FontControlSlider
            onChange={e => setPreviewFontSize(e.target.value)}
            title="size"
            name="size"
            min="10"
            max="200"
          />
        </div>
        <FontInputForm
          inputs={inputs}
          fontIdentifier={fontIdentifier}
        ></FontInputForm>
      </main>
    </>
  )
}

export default FilterDetailView
