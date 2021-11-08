import React from "react"
import { Link } from "react-router-dom"
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
  const { filterRoutes, inDetailView = true} = props
  return (
    <nav className={css(rule)}>
      <Link to={"/"}>no design foundry</Link>
      {inDetailView && filterRoutes.map((route, index) => (
        <Link to={route.route} key={index}>
          {route.title}
        </Link>
      ))}
    </nav>
  )
}

export default Nav
