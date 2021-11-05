import React from "react"
import Nav from "../components/Nav"
import FontPreview from "../components/FontPreview"
import { Link } from "gatsby"
import { useFela } from "react-fela"

function FilterListView(props) {
  const { css } = useFela()
  const { websiteContext } = props
  const filters = websiteContext.filter(
    entry => entry.type === "filterDetailView"
  )
  return (
    <>
      <Nav websiteContext={websiteContext} inDetailView={false}></Nav>
      <main>
        {filters.map((filter, index) => (
          <Link to={filter.route} key={index}>
            <FontPreview fontSize={40} isEven={index % 2 === 0} inDetailView={false}>
              {filter.title}
            </FontPreview>
          </Link>
        ))}
      </main>
    </>
  )
}

export default FilterListView
