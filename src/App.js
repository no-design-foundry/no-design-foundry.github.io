import React, { createContext, useState, useEffect, useRef } from "react";
import { useFela } from "react-fela";
import { Route, Routes } from "react-router";
import Nav from "./components/Nav";
import data from "./data";
import { getMaxFontSize } from "./misc";
import About from "./templates/About";
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
  collector[filterRoute.filterIdentifier] = [
    ...filterRoute.inputs,
    ...(filterRoute?.variableFontControlSliders ?? []),
  ].reduce(
    (inputCollector, input) => {
      inputCollector[input.name] = input.default;
      return inputCollector;
    },
    { fontSize: null }
  );
  return collector;
}, {});

function getMaxFontSizes() {
  return filterRoutes.reduce((collector, filterRoute) => {
    collector[filterRoute.filterIdentifier] = Math.ceil(
      getMaxFontSize(filterRoute.title, "Times New Roman")
    );
    return collector;
  }, {});
}

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
  height: contentIsVisible ? 0 : `calc(100% - ${navHeight - 10}px)`,
});

const contentBackgroundRule = ({
  isTouching,
  transitionWidth,
  transitionHeight,
}) => ({
  zIndex: -1,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  position: "absolute",
  background: "#eee",
  overflow: "hidden",
  transform: "translateZ(0)",
  extend: [
    {
      condition: isTouching,
      style: {
        height: "100% !important",
      },
    },
    {
      condition: !isTouching,
      style: {
        width: "100% !important",
      },
    },
    {
      condition: transitionWidth | transitionHeight,
      style: {
        transitionProperty: [
          ...(transitionWidth ? ["width"] : []),
          ...(transitionHeight ? ["height"] : []),
        ].join(","),
        transitionDuration: ".15s",
        transitionTimingFunction: "linear",
      },
    },
  ],
});

const appRule = () => ({
  fontSize: ["22px", "18px"],
});

function App() {
  const [inputFont, setInputFont] = useState(null);
  const [previewedInputFont, setPreviewedInputFont] = useState(null);
  const [fontSizes, _setFontSize] = useState(getMaxFontSizes());
  function setFontSize(filterIdentifier, value) {
    let value_ = { ...fontSizes };
    value_[filterIdentifier] = value;
    _setFontSize(value_);
  }
  const [formInputValues, _setFormInputsValue] = useState(_formInputValues);
  const [contentIsVisible, setContentIsVisible] = useState(true);
  const [navHeight, setNavHeight] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [transitionWidth, setTransitionWidth] = useState(false);
  const [transitionHeight, setTransitionHeight] = useState(true);
  const [listViewFontSize, setListViewFontSize] = useState(
    Math.min(...Object.values(getMaxFontSizes()))
  );
  const [formHeight, setFormHeight] = useState(0);

  const { css } = useFela({
    contentIsVisible,
    navHeight,
    isTouching,
    transitionWidth,
    transitionHeight,
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

  // if (Date.now() - lastTouchTimestamp.current > 500) {
  // if (transitionHeight) {
  //   setTimeout(()=>{
  //     setTransitionHeight(false)
  //   }, 500)
  // }
  // }

  function handleMouseEnter() {
    if (transitionHeight) {
      setTimeout(() => {
        setTransitionHeight(false);
      }, 500);
    }
    setTransitionWidth(false);
    setIsTouching(false);
  }

  function handleCursorY(e) {
    contentBackground.current.style.height = `${e.pageY}px`;
  }

  function handleTouchStart(e) {
    lastTouchTimestamp.current = Date.now();
    setTransitionWidth(true);
    setIsTouching(true);
    if (e.touches.length === 1) {
      contentBackground.current.style.width = `${e.touches[0].pageX}px`;
    }
  }

  function handleOnTouchMove(e) {
    setTransitionWidth(false);
    let value;
    switch (e.touches.length) {
      case 1:
        value = e.touches[0].pageX;
        break;
      case 2:
        const [{ pageX: x1 }, { pageX: x2 }] = e.touches;
        value = Math.min(x1, x2) + Math.abs(x2 - x1) / 2;
        break;
    }
    contentBackground.current.style.width = `${value}px`;
  }

  function handleOnResize(e) {
    setListViewFontSize(Math.min(...Object.values(getMaxFontSizes())));
  }

  useEffect(() => {
    window.addEventListener("resize", handleOnResize);
    window.addEventListener("mousemove", handleCursorY, false);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleOnTouchMove);
    return () => {
      window.removeEventListener("resize", handleOnResize);
      window.removeEventListener("mousemove", handleCursorY);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleOnTouchMove);
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
              <Nav setNavHeight={setNavHeight} filterRoutes={filterRoutes} />
              <FormInputsContext.Provider
                value={{ formInputValues, setFormInputValue }}
              >
                <InputFontContext.Provider value={{ inputFont, setInputFont }}>
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
                                  key={route.route}
                                  setFormHeight={setFormHeight}
                                  formHeight={formHeight}
                                  fontSize={fontSizes[route.filterIdentifier]}
                                  setFontSize={(value) =>
                                    setFontSize(route.filterIdentifier, value)
                                  }
                                ></DetailView>
                              );
                              break;
                            case "filterListView":
                              element = (
                                <ListView
                                  {...route}
                                  filterRoutes={filterRoutes}
                                  fontSize={listViewFontSize}
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
                        {filterRoutes.map((filterRoute, index) => (
                          <Route
                            key={`about_route_${index}`}
                            path={`${filterRoute.route}/about`}
                            element={
                              <About
                                identifier={filterRoute.filterIdentifier}
                              />
                            }
                          ></Route>
                        ))}
                        <Route
                          path={`/about`}
                          element={<About identifier="foundry"></About>}
                        ></Route>
                      </Routes>
                    </main>
                  </PreviewedInputFontContext.Provider>
                </InputFontContext.Provider>
              </FormInputsContext.Provider>
            </ContentVisibilityContext.Provider>
            <div className={css(contentOverlayRule)}></div>
            <div ref={contentBackground} className={css(contentBackgroundRule)}>
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
                          setFormHeight={setFormHeight}
                          formHeight={formHeight}
                          fontSize={fontSizes[route.filterIdentifier]}
                        />
                      );
                      break;
                    case "filterListView":
                      element = (
                        <ListViewOverlay
                          {...route}
                          filterRoutes={filterRoutes}
                          navHeight={navHeight}
                          fontSize={listViewFontSize}
                        />
                      );
                      break;
                    default:
                      throw new Error("not matched");
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
    </div>
  );
}

export default App;
