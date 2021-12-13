import React, { createContext, useState, useEffect, useRef } from "react";
import { useFela } from "react-fela";
import { Route, Routes } from "react-router";
import Link from "./components/Link";
import Nav from "./components/Nav";
import data from "./data";
// const data = require("./data");
import DetailView from "./templates/DetailView";
import DetailViewOverlay from "./templates/DetailViewOverlay";
import ListView from "./templates/ListView";
import ListViewOverlay from "./templates/ListViewOverlay";

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
  transform: "translateZ(0)",
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

const contentBackgroundRule = ({ isTouching, transitionWidth }) => ({
  zIndex: -1,
  top: 0,
  left: 0,
  width: "100%",
  position: "absolute",
  background: "#eee",
  overflow: "hidden",
  transform: "translateZ(0)",
  extend: [
    {
      condition: isTouching,
      style: {
        height: "100%",
      },
    },
    {
      condition: !isTouching,
      style: {
        width: "100%",
      },
    },
    {
      condition: transitionWidth,
      style: {
        transition: "width .15s ease-in",
      },
    },
  ],
});

const appRule = ({ touchAction }) => ({
  fontSize: ["22px", "18px"],
  extend: [
    {
      condition: !touchAction,
      style: {
        touchAction: "none",
      },
    },
  ],
});

function App() {
  const [inputFont, setInputFont] = useState(null);
  const [previewedInputFont, setPreviewedInputFont] = useState(null);
  const [fontSize, setFontSize] = useState(document.body.clientWidth / 4);
  const [formInputValues, _setFormInputsValue] = useState(_formInputValues);
  const [contentIsVisible, setContentIsVisible] = useState(true);
  const [navHeight, setNavHeight] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [touchAction, setTouchAction] = useState(true);
  const [transitionWidth, setTransitionWidth] = useState(false);
  const [cursorY, setCursorY] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [listViewFontSize, setListViewFontSize] = useState(200);
  const [detailViewFontSize, setDetailViewFontSize] = useState(200)


  const { css } = useFela({
    contentIsVisible,
    navHeight,
    touchAction,
    isTouching,
    transitionWidth,
  });

  const contentBackground = useRef();
  const lastTouchTimestamp = useRef(Date.now());

  const [previewedOutputFonts, _setPreviewedOutputFonts] = useState(
    filterRoutes.reduce((collector, filterRoute) => {
      collector[filterRoute.filterIdentifier] = Array(
        filterRoute.numberOfLayers
      );
      return collector;
    }, {})
  );

  const mainRule = () => ({
  })

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

  function setPreviewedOutputFonts(filterIdentifier, value) {
    let collector = {};
    collector[filterIdentifier] = value;
    _setPreviewedOutputFonts({ ...previewedOutputFonts, ...collector });
  }

  function setFontVariations(filterIdentifier, tag, value) {
    let collector = { ...fontVariations };
    collector[filterIdentifier][tag] = parseInt(value);
    _setFontVariations(collector);
  }

  function setFormInputValue(filterIdentifier, name, value) {
    let collector = { ...formInputValues };
    collector[filterIdentifier][name] = value;
    _setFormInputsValue(collector);
  }

  function handleCursorY(e) {
    if (Date.now() - lastTouchTimestamp.current > 500) {
      setTransitionWidth(false);
      setIsTouching(false);
      setCursorY(e.pageY);
    }
  }

  function handleTouchStart(e) {
    lastTouchTimestamp.current = Date.now();
    setTransitionWidth(true);
    setIsTouching(true);
    if (e.touches.length === 1) {
      setDragX(e.touches[0].pageX);
    }
  }

  function handleTouchEnd(e) {}

  function handleTouchCancel(e) {}

  function handleOnTouchMove(e) {
    setTransitionWidth(false);
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setDragX(e.touches[0].pageX);
    } else {
      setTouchAction(true);
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleCursorY);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleOnTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchCancel);
    return () => {
      window.removeEventListener("mousemove", handleCursorY);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleOnTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchCancel);
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
                <Nav setNavHeight={setNavHeight} filterRoutes={filterRoutes}/>
                <FormInputsContext.Provider
                  value={{ formInputValues, setFormInputValue }}
                >
                  <InputFontContext.Provider
                    value={{ inputFont, setInputFont }}
                  >
                    <PreviewedInputFontContext.Provider
                      value={{ previewedInputFont, setPreviewedInputFont }}
                    >
                      <main className={css(mainRule)}>
                        <Routes>
                          {data.map((route, index) => {
                            let element;
                            switch (route.type) {
                              case "filterDetailView":
                                element = (
                                  <DetailView
                                    {...route}
                                    navHeight={navHeight}
                                    key={route.route}
                                  ></DetailView>
                                );
                                break;
                              case "filterListView":
                                element = (
                                  <ListView
                                    {...route}
                                    filterRoutes={filterRoutes}
                                    fontSize={listViewFontSize}
                                    setFontSize={setListViewFontSize}
                                  ></ListView>
                                );
                                break;
                              default:
                                throw new Error("view not matched");
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
                style={{
                  ...(isTouching
                    ? { width: `${dragX}px` }
                    : { height: `${cursorY}px` }),
                }}
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
                            fontSize={listViewFontSize}
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
              </div>
            </FontVariationsContext.Provider>
          </PreviewedOutputFontsContext.Provider>
        </PreviewStringsContext.Provider>
      </FontSizeContext.Provider>
    </div>
  );
}

export default App;
