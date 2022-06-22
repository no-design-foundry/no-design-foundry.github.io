import React, { useState } from "react";
import { useFela } from "react-fela";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useMeasure } from "react-use";
import Form from "./components/Form";
import Nav from "./components/Nav";
import { FilterContextWrapper } from "./contexts/FilterContext";
import { OutputFontContextWrapper } from "./contexts/OutputFontContext";
import data from "./data";
import About from "./pages/About";
import Detail from "./pages/Detail";
import Index from "./pages/Index";
import "./styles/style.scss";
import { Transition } from "react-transition-group";

const appRule = () => ({
  minHeight: "calc(100vh - 16px)",
});

const headerRule = () => ({
  display: "flex",
  gap: "1ch",
  // position: "fixed",
  top: "8px",
  left: "8px",
});

const mainRule = ({ headerHeight = 100 }) => ({
  // paddingTop: headerHeight + "px",
});

function App() {
  const { css } = useFela();
  return (
    <div className={css(appRule)}>
      <OutputFontContextWrapper>
        <header className={css(headerRule)}>
          <Nav />
        </header>
        <main className={css(mainRule)}>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/about" element={<About identifier={"home"} />} />
            {data.map((filter) => (
              <Route
                key={filter.identifier}
                path={filter.route}
                element={
                  <FilterContextWrapper data={filter}>
                    <Detail></Detail>
                    <Form></Form>
                  </FilterContextWrapper>
                }
              ></Route>
            ))}

            {data.map((filter) => (
              <Route
                key={`${filter.identifier}-about`}
                path={`${filter.route}/about`}
                element={<About identifier={filter.identifier} />}
              />
            ))}
          </Routes>
        </main>
      </OutputFontContextWrapper>
    </div>
  );
}

export default App;
