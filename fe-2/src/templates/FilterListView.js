import React from "react"
import FontPreview from "../components/FontPreview"
// import { Link } from "react-router-dom"
import Link from "../components/Link"
import { defaultFontSize } from "../rules/variables"

function FilterListView(props) {
  const { filterRoutes } = props
  return (
    <main>
      {filterRoutes.map((filter, index) => (
        <Link to={filter.route} key={index}>
          <FontPreview fontSize={defaultFontSize} isEven={index % 2 === 0} inDetailView={false} stuckOnTop={index===0} stuckOnBottom={index===(filterRoutes.length - 1)}>
            {filter.title}
          </FontPreview>
        </Link>
      ))}
    </main>
  )
}

export default React.memo(FilterListView)
