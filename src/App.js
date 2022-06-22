import React from "react";
import { useFela } from "react-fela";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useMeasure } from "react-use";
import Form from "./components/Form";
import Nav from "./components/Nav";
import { FilterContextWrapper } from "./contexts/FilterContext";
import data from "./data";
import About from "./pages/About";
import Detail from "./pages/Detail";
import Index from "./pages/Index";
import "./styles/style.scss";

const appRule = () => ({
  minHeight: "calc(100vh - 16px)",
})

const headerRule = () => ({
  display: "flex",
  gap: "1ch",
  // position: "fixed",
  top: "8px",
  left: "8px",
});

const mainRule = ({headerHeight=100}) => ({
  // paddingTop: headerHeight + "px",
})

function App() {
  const { css } = useFela();
  return (
    <div className={css(appRule)}>
      <BrowserRouter>
        <header className={css(headerRule)}>
          <Nav />
        </header>
        <main className={css(mainRule)}>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/about" element={<About identifier={"home"} />} />
            {data.map((filter) => (
                <React.Fragment key={filter.identifier}>
                  <Route
                    path={filter.route}
                    element={
                      <FilterContextWrapper data={filter}>
                        <Detail></Detail>
                        <Form></Form>
                      </FilterContextWrapper>
                    }
                  ></Route>
                  <Route
                    path={`${filter.route}/about`}
                    element={<About identifier={filter.identifier} />}
                  />
                </React.Fragment>
              ))}
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
