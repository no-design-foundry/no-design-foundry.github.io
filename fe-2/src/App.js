import React, { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import data from "./data";
import Nav from "./components/Nav";
import FilterListView from "./templates/FilterListView";
import FilterDetailView from "./templates/FilterDetailView";
import Footer from "./components/Footer";
import { useFela } from "react-fela";
import { column, flex, minHeight } from "./rules/generic";

export const Context = createContext();
export const CursorContext = createContext();
export const FormInputsContext = createContext();

const filterRoutes = data.filter((entry) => entry.type === "filterDetailView");

function App() {
  const {css} = useFela()

  const [previewFontSize, setPreviewFontSize] = useState(40);
  const [inputs, setInputs] = useState(
    filterRoutes.reduce((collector, filterRoute) => {
      collector[filterRoute.fontIdentifier] = filterRoute.inputs.map(
        (input) => ({ ...input, currentValue: input.default })
      );
      return collector;
    }, {})
  );

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
          <Nav filterRoutes={filterRoutes}></Nav>
          <CursorContext.Provider value={cursorY}>
            <FormInputsContext.Provider value={{inputs, setInputs}}>
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
            </FormInputsContext.Provider>
          </CursorContext.Provider>
          <Footer></Footer>
        </div>
    </Context.Provider>
  );
}

export default App;
