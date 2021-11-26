import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RendererProvider } from "react-fela";
import { createRenderer } from "fela";
import extend from "fela-plugin-extend";

const renderer = createRenderer({ plugins: [extend()] });

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
  fontSize: "20px",
  fontFamily: "'Times New Roman', serif",
  minHeight: "100vh",
  position: "relative",
};
renderer.renderStatic(bodyStyle, "body, #root");

const ulStyle = {
  margin: 0,
  listStyleType: "None",
  padding: 0,
};
renderer.renderStatic(ulStyle, "ul");

const buttonStyle = {
  whiteSpace: "nowrap",
};
renderer.renderStatic(buttonStyle, "button");

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
