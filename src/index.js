import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RendererProvider } from "react-fela";
import { createRenderer } from "fela";
import extend from "fela-plugin-extend";
import embedded from "fela-plugin-embedded";
import responsiveValue from "fela-plugin-responsive-value";
import multipleSelectors from 'fela-plugin-multiple-selectors'


const getMediaQueries = (values, props) => {
  switch(values.length) {
   case 2:
     return ["@media (min-width: 570px)"];
    default:
      return []
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
      width: true
    }),
  ],
});

const resetStyle = {
  padding: 0,
  margin: 0,
  boxSizing: "border-box",
  textDecoration: "None",
  fontFamily: "inherit",
  fontSize: "inherit",
  color: "inherit",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
};
renderer.renderStatic(resetStyle, "html,body,div,input,label,a,button");

const bodyStyle = {
  fontFamily: "'Times New Roman', serif",
  maxWidth: "100vw",
  minHeight: "100vh",
  position: "relative",
};
renderer.renderStatic(bodyStyle, "body");

const htmlStyle = {
  overflowX: "hidden",
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
  textDecoration: "underline"
};
renderer.renderStatic(buttonStyle, "button");

const disabledStyle = {
  color: "gray",
  userSelect: "none",
  pointerEvents: "none",
};
renderer.renderStatic(disabledStyle, "*[disabled]");

const inputRule = {
  minWidth: "100px"
  //   -webkit-appearance: none;
  //   border: 1px solid #000000;
  //   height: 36px;
  //   width: 16px;
  //   border-radius: 3px;
  //   background: #ffffff;
  //   cursor: pointer;
  //   margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  //   box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
  // } 
}
renderer.renderStatic(inputRule, "input");



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
