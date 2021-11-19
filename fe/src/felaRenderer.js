import { createRenderer } from "fela"
import responsiveValue from "fela-plugin-responsive-value"
import embedded from "fela-plugin-embedded"
import extend from "fela-plugin-extend"

const getMediaQueries = (values, props) => {
  const small = "@media (min-width: 480px)"
  const medium = "@media (min-width: 800px)"
  const large = "@media (min-width: 1024px)"
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
  fontFamily: "rastr, Helvetica, Arial, sans-serif",
  fontSize: "20px",
  lineHeight: "1.2em",
  minHeight: "100vh",
}

renderer.renderStatic(bodyStyle, "body")

const allRule = {
  fontSize: "inherit",
  lineHeight: "inherit",
  fontFamily: "inherit",
}

renderer.renderStatic(allRule, "*")


const gatsby = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}

renderer.renderStatic(gatsby, "#gatsby-focus-wrapper")

// const inputRule = {
//     background: "red",
// }

// renderer.renderStatic(inputRule, "input:disabled")

renderer.renderStatic({
  cursor: "pointer"
}, "*[role=button]")

const files = ["/rastr.ttf"]
renderer.renderFont("rastr", files)

export default renderer