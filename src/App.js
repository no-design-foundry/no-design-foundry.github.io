import React, { useState, useEffect, useRef, createContext } from "react";
import { useFela } from "react-fela";
import { Route, Routes, useLocation } from "react-router";
import Nav from "./components/Nav";
import data from "./data";
import { getMaxFontSize } from "./misc";
import About from "./templates/About";
import DetailView from "./templates/DetailView";
import DetailViewOverlay from "./templates/DetailViewOverlay";
import ListView from "./templates/ListView";
import ListViewOverlay from "./templates/ListViewOverlay";
import Contexts from "./Contexts";

export const ContentVisibilityContext = createContext();

export const filterRoutes = data.filter(
  (route) => route.type === "filterDetailView"
);

function getMaxFontSizes() {
  return filterRoutes.reduce((collector, filterRoute) => {
    collector[filterRoute.filterIdentifier] = Math.ceil(
      getMaxFontSize(filterRoute.title, "vtt")
    );
    return collector;
  }, {});
}

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
  fontSize: ["23px", "19px"],
  lineHeight: ["1.3em", "1.15em"],
});

function App() {
  const lastInnerWidth = useRef(window.innerWidth);
  const [contentIsVisible, setContentIsVisible] = useState(true);
  const [fontSizes, setFontSizes] = useState(getMaxFontSizes());
  function setFontSize(filterIdentifier, value) {
    let value_ = { ...fontSizes };
    value_[filterIdentifier] = value;
    setFontSizes(value_);
  }
  const isMounted = useRef(false);
  const [navHeight, setNavHeight] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [transitionWidth, setTransitionWidth] = useState(false);
  const [transitionHeight, setTransitionHeight] = useState(true);
  const [listViewFontSize, setListViewFontSize] = useState(
    Math.min(...Object.values(getMaxFontSizes()))
  );
  const contentBackground = useRef();
  const lastTouchTimestamp = useRef(Date.now());

  const { css } = useFela({
    contentIsVisible,
    navHeight,
    isTouching,
    transitionWidth,
    transitionHeight,
  });

  function handleMouseEnter() {
    if (Date.now() - lastTouchTimestamp.current > 500) {
      setIsTouching(false);
      setTransitionWidth(false);
      if (transitionHeight) {
        setTimeout(() => {
          // setTransitionHeight(false);
        }, 500);
      }
    }
  }

  function handleCursorY(e) {
    if (transitionHeight) {
      const {clientHeight} = contentBackground.current
      if (clientHeight - 10 <= e.pageY) {
        setTransitionHeight(false)
      }
    }
    if (Date.now() - lastTouchTimestamp.current > 500) {
      // setIsTouching(false);
      // setTransitionHeight(false);
      contentBackground.current.style.height = `${e.pageY}px`;
    }
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
    const { innerWidth } = window;
    // console.log(innerHeight)
    if (innerWidth !== lastInnerWidth.current) {
      setListViewFontSize(Math.min(...Object.values(getMaxFontSizes())));
      // document.body.style.minHeight = `${window.innerHeight}px`;
      lastInnerWidth.current = innerWidth;
    }
  }

  useEffect(() => {
    // new ResizeObserver((el)=>console.log(contentBackground.current.offsetHeight, contentBackground.current.style.height)).observe(contentBackground.current)
    isMounted.current = true;
    window.addEventListener("resize", handleOnResize);
    window.addEventListener("mousemove", handleCursorY, false);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleOnTouchMove);
    document.fonts.ready.then(function () {
      setFontSizes(getMaxFontSizes());
      setListViewFontSize(Math.min(...Object.values(getMaxFontSizes())));
    });
    return () => {
      window.removeEventListener("resize", handleOnResize);
      window.removeEventListener("mousemove", handleCursorY);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleOnTouchMove);
    };
  }, []);

  const routes = [
    ...data, 
    ...data.reduce((collector, currentValue) => {
      collector.push({
        type: "about",
        route: (currentValue.route !== "/" ? currentValue.route : "") + "/about",
        identifier: currentValue.route !== "/" ? currentValue.filterIdentifier : "foundry"
      })
      return collector
    }, [])
  ]

  const location = useLocation()

  useEffect(() => {
    setContentIsVisible(false)
    setTimeout(() => {
      setContentIsVisible(true)
    }, (3500));
    return () => {
    };
  }, [location.pathname]);
  

  return (
    <ContentVisibilityContext.Provider value={setContentIsVisible}>
      <Contexts>
        <div className={css(appRule)}>
          <Nav setNavHeight={setNavHeight} filterRoutes={filterRoutes} />
          <main>
            <Routes>
              {routes.map((route, index) => {
                let element;
                switch (route.type) {
                  case "filterDetailView":
                    element = (
                      <DetailView
                        {...route}
                        navHeight={navHeight}
                        key={route.route}
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
                  case "about":
                      element = (
                      <About identifier={route.identifier} />
                      )
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
        </div>
      </Contexts>
    </ContentVisibilityContext.Provider>
  );
}

export default App;
