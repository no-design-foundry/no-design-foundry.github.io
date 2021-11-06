import React, { useState, useEffect } from "react"
import { RendererProvider } from "react-fela"
import { createRenderer } from "fela"
import FilterDetailView from "./FilterDetailView"
import FilterListView from "./FilterListView"
import Footer from "../components/Footer"
import responsiveValue from "fela-plugin-responsive-value"
import embedded from "fela-plugin-embedded"
import extend from "fela-plugin-extend"

const getMediaQueries = (values, props) => {
  const small = "@media (min-width: 480px)"
  const medium = "@media (min-width: 800px)"
  const large = "@media (min-width: 1024px)"
  // we can even return different breakpoints depending on the number of passed values
  // remember the first value is always the default value
  switch (values.length) {
    case 2:
      return [large]
    case 3:
      return [small, large]
    default:
      return [small, medium, large]
  }
}

const responsiveProps = {
  padding: true,
  paddingLeft: true,
  paddingRight: true,
  paddingTop: true,
  paddingBottom: true,
  margin: true,
  marginLeft: true,
  marginRight: true,
  marginTop: true,
  marginBottom: true,
  width: true,
  height: true,
}

const renderer = createRenderer({
  plugins: [
    responsiveValue(getMediaQueries, responsiveProps),
    embedded(),
    extend(),
  ],
})

const elementStyle = {
  boxSizing: "border-box",
  padding: 0,
  margin: 0,
  outline: "None",
  border: "None",
  background: "None",
  textDecoration: "None",
  fontFamily: "inherit",
  fontSize: "inherit",
  color: "inherit",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
}
renderer.renderStatic(elementStyle, "html,body,div,input,label,a")

const bodyStyle = {
  fontSize: "20px",
  lineHeight: "1.2em",
  fontFamily: "rastr, Helvetica, Arial, sans-serif",
  minHeight: "100vh",
}

renderer.renderStatic(bodyStyle, "body")

const gatsby = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}

renderer.renderStatic(gatsby, "#gatsby-focus-wrapper")

const link = {
  "&:invalid, &:invalid ~ *": {
    background: "red",
  },
}

renderer.renderStatic(link, "input")

const files = ["/fonts/rastr.ttf"]
renderer.renderFont("rastr", files)

export const Context = React.createContext()

function Page(props) {
  const [cursorY, setCursorY] = useState(0)
  const [showPreviewFont, setShowPreviewFont] = useState(false)
  function handleOnMouseMove(e) {
    setCursorY(e.pageY)
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleOnMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleOnMouseMove)
    }
  }, [])

  let pageContent
  switch (props.pageContext.type) {
    case "filterDetailView":
      pageContent = <FilterDetailView {...props.pageContext} />
      break
    case "filterListView":
      pageContent = <FilterListView {...props.pageContext} />
      break
    default:
      throw new Error(`page ${props.pageContext.type} not found`)
  }
  return (
    <RendererProvider renderer={renderer}>
      <Context.Provider value={{cursorY, showPreviewFont, setShowPreviewFont}}>
        {pageContent}
        <Footer></Footer>
      </Context.Provider>
    </RendererProvider>
  )
}

export default Page
