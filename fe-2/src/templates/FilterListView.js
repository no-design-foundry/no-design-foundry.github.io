import React from "react"
import FontPreview from "../components/FontPreview"
import { Link } from "react-router-dom"

function FilterListView(props) {
  const { filterRoutes } = props
  return (
    <>
      <main>
        {filterRoutes.map((filter, index) => (
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
