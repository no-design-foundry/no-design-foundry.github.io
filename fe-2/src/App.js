import React, { createContext, useState, useEffect, useRef } from "react";
import { useFela } from "react-fela";
import { Route, Routes } from "react-router";
import Link from "./components/Link";
import Nav from "./components/Nav";
import data from "./data";
import DetailView from "./templates/DetailView";
import DetailViewOverlay from "./templates/DetailViewOverlay";
import ListView from "./templates/ListView";
import ListViewOverlay from "./templates/ListViewOverlay";
import Footer from "./components/Footer";

export const FormInputsContext = createContext();
export const InputFontContext = createContext();
export const PreviewStringsContext = createContext();
export const FontSizeContext = createContext();
export const ContentVisibilityContext = createContext();
export const PreviewedInputFontContext = createContext();
export const PreviewedOutputFontsContext = createContext();
export const FontVariationsContext = createContext();

const filterRoutes = data.filter((route) => route.type === "filterDetailView");
const _formInputValues = filterRoutes.reduce((collector, filterRoute) => {
  collector[filterRoute.filterIdentifier] = filterRoute.inputs.reduce(
    (inputCollector, input) => {
      inputCollector[input.name] = input.default;
      return inputCollector;
    },
    {}
  );
  return collector;
}, {});

const contentOverlayRule = ({ contentIsVisible, navHeight }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  height: "0px",
  left: 0,
  background: "#ccc",
  transition: `height ${350}ms`,
  transitionTimingFunction: contentIsVisible
    ? "cubic-bezier(.55,0,1,.45)"
    : "cubic-bezier(0,.55,.45,1)",
  extend: [
    {
      condition: !contentIsVisible,
      style: {
        height: `calc(100vh - ${navHeight}px)`,
      },
    },
  ],
});

const contentBackgroundRule = () => ({
  zIndex: -1,
  top: 0,
  left: 0,
  width: "100%",
  position: "absolute",
  background: "#eee",
  overflow: "hidden",
});

const appRule = () => ({
  position: "relative",
});

function App() {
  const [inputFont, setInputFont] = useState(null);
  const [previewedInputFont, setPreviewedInputFont] = useState(null);
  const [previewedOutputFonts, _setPreviewedOutputFonts] = useState(
    filterRoutes.reduce((collector, filterRoute) => {
      collector[filterRoute.filterIdentifier] = Array(
        filterRoute.numberOfLayers
      );
      return collector;
    }, {})
  );
  function setPreviewedOutputFonts(filterIdentifier, value) {
    let collector = {};
    collector[filterIdentifier] = value;
    _setPreviewedOutputFonts({ ...previewedOutputFonts, ...collector });
  }
  const [fontVariations, _setFontVariations] = useState(
    filterRoutes.reduce((collector, filterRoute) => {
      if (filterRoute.variableFontControlSliders) {
        collector[filterRoute.filterIdentifier] =
          filterRoute.variableFontControlSliders.reduce((collector, slider) => {
            collector[slider.tag] = slider.default;
            return collector;
          }, {});
      }
      return collector;
    }, {})
  );

  function setFontVariations(filterIdentifier, tag, value) {
    let collector = {...fontVariations}
    collector[filterIdentifier][tag] = parseInt(value)
    _setFontVariations(collector);
  }
  
  const [fontSize, setFontSize] = useState(200);
  const contentBackground = useRef();
  const [formInputValues, _setFormInputsValue] = useState(_formInputValues);
  const [contentIsVisible, setContentIsVisible] = useState(true);
  const [navHeight, setNavHeight] = useState(77);
  const [cursorY, setCursorY] = useState(0);
  const { css } = useFela({ contentIsVisible, navHeight });

  function setFormInputValue(filterIdentifier, name, value) {
    let collector = { ...formInputValues };
    collector[filterIdentifier][name] = value;
    _setFormInputsValue(collector);
  }

  function handleCursorY(e) {
    setCursorY(e.pageY);
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleCursorY);
    return () => {
      window.removeEventListener("mousemove", handleCursorY);
    };
  }, []);

  const [previewStrings, _setPreviewString] = useState(
    filterRoutes.reduce((collector, filterRoute) => {
      collector[filterRoute.filterIdentifier] = filterRoute.title;
      return collector;
    }, {})
  );

  function setPreviewString(filterIdentifier, value) {
    let collector = { ...previewStrings };
    collector[filterIdentifier] = value;
    _setPreviewString(collector);
  }

  return (
    <div className={css(appRule)}>
      <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
        <PreviewStringsContext.Provider
          value={{ previewStrings, setPreviewString }}
        >
          <PreviewedOutputFontsContext.Provider
            value={{ previewedOutputFonts, setPreviewedOutputFonts }}
          >
            <FontVariationsContext.Provider
              value={{ fontVariations, setFontVariations }}
            >
              <ContentVisibilityContext.Provider value={setContentIsVisible}>
                <Nav setNavHeight={setNavHeight}>
                  <ul>
                    <li>
                      <Link to={"/"}>no design foundry</Link>
                    </li>
                    {filterRoutes.map((route, index) => (
                      <li key={`nav_${index}`}>
                        <Link to={route.route}>{route.title}</Link>
                      </li>
                    ))}
                  </ul>
                </Nav>
                <FormInputsContext.Provider
                  value={{ formInputValues, setFormInputValue }}
                >
                  <InputFontContext.Provider
                    value={{ inputFont, setInputFont }}
                  >
                    <PreviewedInputFontContext.Provider
                      value={{ previewedInputFont, setPreviewedInputFont }}
                    >
                      <main>
                        <Routes>
                          {data.map((route, index) => {
                            let element;
                            switch (route.type) {
                              case "filterDetailView":
                                element = (
                                  <DetailView
                                    {...route}
                                    navHeight={navHeight}
                                    cursorY={cursorY}
                                    key={route.route}
                                  ></DetailView>
                                );
                                break;
                              case "filterListView":
                                element = (
                                  <ListView
                                    {...route}
                                    filterRoutes={filterRoutes}
                                  ></ListView>
                                );
                                break;
                            }
                            return (
                              <Route
                                path={route.route}
                                element={element}
                                key={`route_${index}`}
                              ></Route>
                            );
                          })}
                        </Routes>
                      </main>
                    </PreviewedInputFontContext.Provider>
                  </InputFontContext.Provider>
                </FormInputsContext.Provider>
              </ContentVisibilityContext.Provider>
              <div className={css(contentOverlayRule)}></div>
              <div
                ref={contentBackground}
                className={css(contentBackgroundRule)}
                style={{ height: `${cursorY + 2}px` }}
              >
                <Routes>
                  {data.map((route, index) => {
                    let element;
                    switch (route.type) {
                      case "filterDetailView":
                        element = (
                          <DetailViewOverlay
                            {...route}
                            navHeight={navHeight}
                            key={route.route}
                          />
                        );
                        break;
                      default:
                        element = (
                          <ListViewOverlay
                            {...route}
                            filterRoutes={filterRoutes}
                            navHeight={navHeight}
                          />
                        );
                    }
                    return (
                      <Route
                        path={route.route}
                        element={element}
                        key={`overlay_route_${index}`}
                      />
                    );
                  })}
                </Routes>
                <Footer navHeight={navHeight}></Footer>
              </div>
            </FontVariationsContext.Provider>
          </PreviewedOutputFontsContext.Provider>
        </PreviewStringsContext.Provider>
      </FontSizeContext.Provider>
    </div>
  );
}

export default App;
