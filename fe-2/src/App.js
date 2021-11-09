import React, { createContext, useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import data from "./data";
import Nav from "./components/Nav";
import FilterListView from "./templates/FilterListView";
import FilterDetailView from "./templates/FilterDetailView";
import Footer from "./components/Footer";
import { useFela } from "react-fela";
import { column, flex, minHeight } from "./rules/generic";
import AnimateHeight from "react-animate-height"

export const Context = createContext();
export const CursorContext = createContext();
export const FormInputsContext = createContext();
export const ContentVisibilityContext = createContext();

const filterRoutes = data.filter((entry) => entry.type === "filterDetailView");

function App() {
  const contetWrapperRef = useRef();
  const { css } = useFela();
  let location = useLocation();

  useEffect(() => {
  }, [location]);

  const [previewFontSize, setPreviewFontSize] = useState(40);
  const [inputs, setInputs] = useState(
    filterRoutes.reduce((collector, filterRoute) => {
      collector[filterRoute.fontIdentifier] = filterRoute.inputs.map(
        (input) => ({ ...input, currentValue: input.default })
      );
      return collector;
    }, {})
  );

  const [contentIsVisible, setContentIsVisible] = useState(true);

  useEffect(() => {
    console.log(contentIsVisible)
  }, [contentIsVisible])

  const [cursorY, setCursorY] = useState(0);
  const [inputFont, setInputFont] = useState(null);
  const [previewStrings, setPreviewStrings] = useState(
    filterRoutes.reduce((collector, currentValue) => {
      let value = {};
      value[currentValue.fontIdentifier] = currentValue.title;
      return {
        ...collector,
        ...value,
      };
    }, {})
  );

  function handleOnMouseMove(e) {
    setCursorY(e.pageY);
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleOnMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleOnMouseMove);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        previewFontSize,
        setPreviewFontSize,
        inputFont,
        setInputFont,
        previewStrings,
        setPreviewStrings,
      }}
    >
      <div className={css(flex(), minHeight("100vh"), column())}>
        <ContentVisibilityContext.Provider value={setContentIsVisible}>
          <Nav filterRoutes={filterRoutes}></Nav>
          <CursorContext.Provider value={cursorY}>
            <FormInputsContext.Provider value={{ inputs, setInputs }}>
              <AnimateHeight height={contentIsVisible ? "auto" : 2} duration={350}>
                <Routes>
                  {data.map((entry) => {
                    let el;
                    switch (entry.type) {
                      case "filterDetailView":
                        el = (
                          <FilterDetailView
                            {...entry}
                            key={entry.route}
                          ></FilterDetailView>
                        );
                        break;
                      case "filterListView":
                        el = (
                          <FilterListView
                            filterRoutes={filterRoutes}
                          ></FilterListView>
                        );
                        break;
                      default:
                        throw new Error("component not found");
                    }
                    return (
                      <Route
                        key={entry.route}
                        path={entry.route}
                        element={el}
                      ></Route>
                    );
                  })}
                </Routes>
              </AnimateHeight>
            </FormInputsContext.Provider>
          </CursorContext.Provider>
          <Footer></Footer>
        </ContentVisibilityContext.Provider>
      </div>
    </Context.Provider>
  );
}

export default App;
