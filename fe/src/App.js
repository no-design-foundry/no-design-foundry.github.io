import React, { createContext, useState, useEffect, useRef, createRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import data from "./data";
import Nav from "./components/Nav";
import FilterListView from "./templates/FilterListView";
import FilterDetailView from "./templates/FilterDetailView";
import Footer from "./components/Footer";
import { useFela } from "react-fela";
import { column, flex, minHeight, grow } from "./rules/generic";
import { defaultFontSize } from "./rules/variables";

export const Context = createContext();
export const CursorContext = createContext();
export const FormInputsContext = createContext();
export const ContentVisibilityContext = createContext();
export const NavHeightContext = createContext();

const filterRoutes = data.filter((entry) => entry.type === "filterDetailView");

const routeOverlayRule = ({contentIsVisible, navHeight}) => ({
  zIndex: 1000,
  bottom: 0,
  position: "fixed",
  width: "100%",
  background: "white",
  transition: "height .35s ease-in",
  height: "0px",
  extend: [
    {
      condition: !contentIsVisible,
      style: {
        height: `calc(100vh - ${navHeight}px)`
      }
    }
  ]
});

const backgroundLayerRule = () => ({
  background: "#EEE",
  position: "absolute",
  width: "100%",
  zIndex: -1,
})


function App() {
  const location = useLocation();
  const navRef = createRef(null);

  useEffect(() => {}, [location]);

  const [previewFontSize, setPreviewFontSize] = useState(defaultFontSize);
  const [formInputs, setFormInputs] = useState(
    filterRoutes.reduce((collector, filterRoute) => {
      collector[filterRoute.fontIdentifier] = filterRoute.inputs.reduce((inputCollector, input) => {
        inputCollector[input.name] = input.defaultValue
        return inputCollector
      }
      , {});
      return collector;
    }, {})
  );

  const [contentIsVisible, setContentIsVisible] = useState(true);
  const [cursorY, setCursorY] = useState(0);
  const [navHeight, setNavHeight] = useState(null);
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


  const { css } = useFela({ contentIsVisible, navHeight, cursorY });

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
      <div className={css(backgroundLayerRule)} style={{height: `${cursorY}px`}}></div>
      <div className={css(flex(), grow(), column(), minHeight("100vh"))}>
        <ContentVisibilityContext.Provider value={setContentIsVisible}>
              <NavHeightContext.Provider value={{navHeight, setNavHeight}}>
          <Nav setNavHeight={setNavHeight} filterRoutes={filterRoutes} />
          <CursorContext.Provider value={cursorY}>
            <FormInputsContext.Provider value={{ formInputs, setFormInputs }}>
              <main className={css(flex(), grow(), column())}>
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
              </main>
              <div className={css(routeOverlayRule)}></div>
            </FormInputsContext.Provider>
          </CursorContext.Provider>
          {/* <Footer></Footer> */}
            </NavHeightContext.Provider>
        </ContentVisibilityContext.Provider>
      </div>
    </Context.Provider>
  );
}

export default App;
