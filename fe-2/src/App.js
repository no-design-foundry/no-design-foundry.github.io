import React, { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import data from "./data";
import Nav from "./components/Nav";
import renderer from "./felaRenderer";
import { RendererProvider } from "react-fela";
import FilterListView from "./templates/FilterListView";
import FilterDetailView from "./templates/FilterDetailView";

export const Context = createContext();

const filterRoutes = data
  .filter((entry) => entry.type === "filterDetailView")
  .map((filter) => ({
    route: filter.route,
    title: filter.title,
    fontIdentifier: filter.fontIdentifier,
  }));

function App() {
  const [previewFontSize, setPreviewFontSize] = useState(40);
  const [cursorY, setCursorY] = useState(0);
  const [inputFont, setInputFont] = useState(null);
  const [previewStrings, setPreviewStrings] = useState(
    filterRoutes.reduce((collector, currentValue) => {
      let value = {}
      value[currentValue.fontIdentifier] = currentValue.title
      return {
        ...collector,
        ...value
      }
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
        cursorY,
        previewFontSize,
        setPreviewFontSize,
        inputFont,
        setInputFont,
        previewStrings,
        setPreviewStrings,
      }}
    >
      <RendererProvider renderer={renderer}>
        <div className="App">
          <Nav filterRoutes={filterRoutes}></Nav>
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
        </div>
      </RendererProvider>
    </Context.Provider>
  );
}

export default App;
