import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useFela } from "react-fela";
import { Route, Routes } from "react-router";
import Link from "./components/Link";
import Nav from "./components/Nav";
import data from "./data";
import DetailView from "./templates/DetailView";
import ListView from "./templates/ListView";

export const FormInputsContext = createContext();
export const InputFontContext = createContext();
export const PreviewStringsContext = createContext();
export const FontSizeContext = createContext();
export const ContentVisibilityContext = createContext();

const filterRoutes = data.filter((route) => route.type === "filterDetailView");
const _formInputValues = filterRoutes.reduce((collector, filterRoute) => {
  collector[filterRoute.fontIdentifier] = filterRoute.inputs.reduce(
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
  background: "#eee",
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
  const [fontSize, setFontSize] = useState(200);
  const contentBackground = useRef();
  const [formInputValues, _setFormInputsValue] = useState(_formInputValues);
  const [contentIsVisible, setContentIsVisible] = useState(true);
  const [navHeight, setNavHeight] = useState(44);
  const [cursorY, setCursorY] = useState(0);
  const { css } = useFela({ contentIsVisible, navHeight });

  function setFormInputValue(fontIdentifier, name, value) {
    let collector = { ...formInputValues };
    collector[fontIdentifier][name] = value;
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
      collector[filterRoute.fontIdentifier] = filterRoute.title;
      return collector;
    }, {})
  );

  function setPreviewString(fontIdentifier, value) {
    let collector = { ...previewStrings };
    collector[fontIdentifier] = value;
    _setPreviewString(collector);
  }

  return (
    <div className={css(appRule)}>
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
          <InputFontContext.Provider value={{ inputFont, setInputFont }}>
            <PreviewStringsContext.Provider
              value={{ previewStrings, setPreviewString }}
            >
              <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
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
              </FontSizeContext.Provider>
            </PreviewStringsContext.Provider>
          </InputFontContext.Provider>
        </FormInputsContext.Provider>
      </ContentVisibilityContext.Provider>
      <div className={css(contentOverlayRule)}></div>
      <div
        ref={contentBackground}
        className={css(contentBackgroundRule)}
        style={{ height: `${cursorY}px` }}
      >
        <div style={{top: "335px", position: "absolute", width: "100%", fontSize: "200px", display: "flex", justifyContent: "center"}}><span>Rotorizer</span></div>
      </div>
    </div>
  );
}

export default App;
