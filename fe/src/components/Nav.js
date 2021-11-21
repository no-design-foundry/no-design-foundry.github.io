import React, {useRef, useEffect, useContext} from "react"
// import { Link } from "react-router-dom"
import { useFela } from "react-fela"
import { background, navHeight, padding } from "../rules/variables"
import Link from "./Link"
import { NavHeightContext } from "../App" 

const rule = ({}) => ({
  position: "sticky",
  display: "flex",
  alignItems: "center",
  top: "0px",
  height: `${navHeight}px`,
  zIndex: 1,
  background,
  paddingLeft: "10px",
  // padding,
  "& > * + *": {
    "margin-left": "1ch"
  }
})

const linkRule = () => ({
  ":after": {
    content: '","'
  }
})

function Nav(props) {
  const {setNavHeight} = useContext(NavHeightContext)
  const containerRef = useRef()
  const { filterRoutes, inDetailView = true} = props
  const { css } = useFela()


  function handleOnResize() {
    setNavHeight(containerRef.current.clientHeight)  
  }

  useEffect(() => {
    window.addEventListener("resize", handleOnResize)
    handleOnResize()
    return () => {
      window.removeEventListener("resize", handleOnResize)
    }
  }, [])

  return (
    <nav ref={containerRef} className={css(rule)}>
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
