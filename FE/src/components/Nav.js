import React from "react"
import { Link } from "gatsby"
import { useFela } from "react-fela"
import { padding } from "../rules/variables"

const rule = ({props}) => ({
  padding,
  "& > * + *": {
    "margin-left": "1ch"
  }
})


export function Box({ padding, margin, children }) {
  const { css } = useFela()
  return <div className={css({ padding, margin })}>{children}</div>
}

function Nav(props) {
  const { css } = useFela()
  const { websiteContext, inDetailView = true} = props
  const allFilterRoutes = websiteContext
    .filter(entry => entry.type === "filterDetailView")
    .map(filter => ({
      route: filter.route,
      title: filter.title,
    }))
  return (
    <nav className={css(rule)}>
      <Link to={"/"}>no design foundry</Link>
      {inDetailView && allFilterRoutes.map((route, index) => (
        <Link to={route.route} key={index}>
          {route.title}
        </Link>
      ))}
    </nav>
  )
}

export default Nav
