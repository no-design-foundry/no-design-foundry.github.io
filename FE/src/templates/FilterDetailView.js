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
  const defaultValue = 30
  const [previewedString, setPreviewedString] = useState(title)
  const [previewFontSize, setPreviewFontSize] = useState(defaultValue)

  return (
    <>
      <Nav websiteContext={websiteContext}></Nav>
      <main className={css(rule)}>
        <FontPreview fontSize={previewFontSize}>{previewedString}</FontPreview>
        {/* <div className={css(formRule)}>

        </div> */}
        <FontInputForm
          title={title}
          inputs={inputs}
          fontIdentifier={fontIdentifier}
          setPreviewedString={setPreviewedString}
        >
          <FontControlSlider
            onChange={e => setPreviewFontSize(e.target.value)}
            title="size"
            min="10"
            max="200"
            defaultValue={defaultValue}
          />
        </FontInputForm>
      </main>
    </>
  )
}

export default FilterDetailView
