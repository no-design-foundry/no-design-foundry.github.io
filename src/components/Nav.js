import React, { useEffect, useRef } from "react";
import { useFela } from "react-fela";
import { useLocation } from "react-router";
import NavLink from "./NavLink";

const navRule = () => ({
  padding: "10px",
  // position: "sticky",
  // top: 0,
});

const menuItemRule = () => ({});

const aboutRule = () => ({
  ":before": {
    content: '", "',
  },
});

const subUlRule = () => ({
  display: "flex",
  flexDirection: "row",
});

function Nav(props) {
  const homeRef = useRef();
  const { setNavHeight, filterRoutes } = props;
  const { css } = useFela();
  const location = useLocation();

  function handleOnResize() {
    const { height } = homeRef.current.getBoundingClientRect();
    setNavHeight(height + 20);
  }

  useEffect(() => {
    handleOnResize();
  }, [location]);

  useEffect(() => {
    handleOnResize();
    window.addEventListener("resize", handleOnResize);
    return () => {
      window.removeEventListener("resize", handleOnResize);
    };
  }, []);

  return (
    <nav className={css(navRule)}>
      <ul>
        <li ref={homeRef} className={css(menuItemRule)}>
          <ul className={css(subUlRule)}>
            <li>
              <NavLink
                to={"/"}
                condition={(pathname) => ["/", "/about"].includes(pathname)}
              >
                no design foundry
              </NavLink>
            </li>
            {(location.pathname === "/" || location.pathname === "/about") && (
              <li>
                <NavLink
                  to={"/about"}
                  className={css(aboutRule)}
                  condition={(pathname) => pathname === "/about"}
                >
                  about
                </NavLink>
              </li>
            )}
          </ul>
        </li>
        {location.pathname !== "/" &&
          filterRoutes.map((route, index) => (
            <li key={`nav_${index}`}>
              <ul className={css(subUlRule)}>
                <li className={css(menuItemRule)}>
                  <NavLink to={route.route}>{route.title}</NavLink>
                </li>
                {location.pathname.startsWith(route.route) && (
                  <li>
                    <NavLink
                      to={`${route.route}/about`}
                      className={css(aboutRule)}
                    >
                      about
                    </NavLink>
                  </li>
                )}
              </ul>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Nav;
