import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RendererProvider } from "react-fela";
import { createRenderer } from "fela";
import extend from "fela-plugin-extend";
import embedded from "fela-plugin-embedded";
import responsiveValue from "fela-plugin-responsive-value";
import multipleSelectors from "fela-plugin-multiple-selectors";


const getMediaQueries = (values, props) => {
  switch (values.length) {
    case 2:
      return ["@media (min-width: 800px)"];
    default:
      return [];
  }
};

const renderer = createRenderer({
  plugins: [
    extend(),
    embedded(),
    multipleSelectors(),
    responsiveValue(getMediaQueries, {
      padding: true,
      margin: true,
      display: true,
      fontSize: true,
      gridTemplateColumns: true,
      lineHeight: true,
      width: true,
      height: true,
      borderRadius: true
    }),
  ],
});

const resetStyle = {
  boxSizing: "border-box",
  fontFamily: "inherit",
  fontSize: "inherit",
  color: "inherit",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  "&:focus": {
    outline: "none",
    background: "none",
    boxShadow: "none"
  }
};
renderer.renderStatic(resetStyle, "html,body,div,input,label,a,button");

const headlineStyle = {
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
};
renderer.renderStatic(headlineStyle, "h1,h2,h3,h4,h5,h6,h6,h8");

const paddingMarginResetStyle = {
  padding: 0,
  margin: 0,
};

renderer.renderStatic(
  paddingMarginResetStyle,
  "html,body,div,input,label,a,button,h1,h2,h3,h4,h5,h6,h6,h8,p"
);

const bodyStyle = {
  // fontFamily: `"Times New Roman"`,
  fontFamily: `vtt, sans-serif`,
  // "-webkit-font-smoothing": "antialiased",
  // "-moz-osx-font-smoothing": "grayscale",
  maxWidth: "100vw",
  minHeight: "100vh",
  touchAction: "pan-y",
  position: "relative",
  overscrollBehavior: "contain",
  overflow: "auto"
};
renderer.renderStatic(bodyStyle, "body");

const htmlStyle = {
  height: "100%",
  width: "100%",
};

renderer.renderStatic(htmlStyle, "html");

const ulStyle = {
  margin: 0,
  listStyleType: "None",
  padding: 0,
};
renderer.renderStatic(ulStyle, "ul");

const buttonStyle = {
  whiteSpace: "nowrap",
  background: "transparent",
  outline: "none",
  border: "none",
  appearance: "none",
  textAlign: "left",
  textDecoration: "underline",
};
renderer.renderStatic(buttonStyle, "button");

const disabledStyle = {
  color: "#CCC",
  userSelect: "none",
  pointerEvents: "none",
  opacity: "1 !important",
  "-webkit-text-fill-color": "#CCC"
};
renderer.renderStatic(disabledStyle, "*[disabled]");

const inputRule = {
  minWidth: "80px",
};
renderer.renderStatic(inputRule, "input");

const aActiveRule = {
  textDecoration: "underline",
};

renderer.renderStatic(aActiveRule, "a.active");

const fonts = [
  ["rasterizer-0", "ttf"],
  ["rotorizer-0", "ttf"],
  ["rotorizer-1", "ttf"],
  ["vtt", "woff2"],
];
fonts.forEach(([font, extension]) =>
  renderer.renderFont(font, [`${font}.${extension}`])
);

ReactDOM.render(
  <BrowserRouter>
    <RendererProvider renderer={renderer}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RendererProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
