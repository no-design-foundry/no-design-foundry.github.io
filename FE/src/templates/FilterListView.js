import React from "react"
import Nav from "../components/Nav"
import FontPreview from "../components/FontPreview"
import { Link } from "gatsby"

function FilterListView(props) {
  const { websiteContext } = props
  const filters = websiteContext.filter(
    entry => entry.type === "filterDetailView"
  )
  return (
    <>
      <Nav websiteContext={websiteContext} inDetailView={false}></Nav>
      <main>
      {filters.map(filter => (
        <Link to={filter.route}>
          <FontPreview fontSize={40}>{filter.title}</FontPreview>
        </Link>
      ))}
      </main>
    </>
  )
}

export default FilterListView
