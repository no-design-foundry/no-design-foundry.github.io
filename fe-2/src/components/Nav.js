import React from "react"
// import { Link } from "react-router-dom"
import { useFela } from "react-fela"
import { padding } from "../rules/variables"
import Link from "./Link"

const rule = () => ({
  padding,
  "& > * + *": {
    "margin-left": "1ch"
  }
})

const linkRule = () => ({
  ":after": {
    content: '","'
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
      <Link to={"/"} className={css(linkRule)}>no design foundry</Link>
      {inDetailView && filterRoutes.map((route, index) => (
        <Link key={index} to={route.route} className={css(linkRule)}>
          {route.title}
        </Link>
      ))}
    </nav>
  )
}

export default Nav
