import React from "react"
import { RendererProvider } from "react-fela"
import { createRenderer } from "fela"
import FilterDetailView from "./FilterDetailView"
import FilterListView from "./FilterListView"
import Footer from "../components/Footer"


const renderer = createRenderer()

const elementStyle = {
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
  outline: 'None',
  border: 'None',
  background: 'None',
  textDecoration: 'None',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: 'inherit',
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
}
renderer.renderStatic(elementStyle, 'html,body,div,input,label,a')

const bodyStyle = {
  fontSize: '20px',
  lineHeight: '1.2em',
  fontFamily: 'rastr, Helvetica, Arial, sans-serif',
  minHeight: '100vh',
}

renderer.renderStatic(bodyStyle, 'body')

const gatsby = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh"
}

renderer.renderStatic(gatsby, '#gatsby-focus-wrapper')

const link = {
  "&:invalid, &:invalid ~ *": {
    background: "red"
  }
}

renderer.renderStatic(link, 'input')

const files = ['/fonts/rastr.ttf']

renderer.renderFont('rastr', files)



function Page(props) {
  let pageContent
  switch(props.pageContext.type) {
    case "filterDetailView":
      pageContent = <FilterDetailView {...props.pageContext}/>
      break
    case "filterListView":
      pageContent = <FilterListView {...props.pageContext}/>
      break
    default:
      throw new Error(`page ${props.pageContext.type} not found`)
  }
  return (
    <RendererProvider renderer={renderer}>
      {pageContent}
      <Footer></Footer>
    </RendererProvider>
  )
}

export default Page
