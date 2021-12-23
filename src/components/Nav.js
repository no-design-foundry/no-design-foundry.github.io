import React, { useEffect, useRef } from "react";
import { useFela } from "react-fela";
import { useLocation } from "react-router";
import Link from "./Link";

const navRule = () => ({
  fontFamily: "test",
  padding: "10px",
  position: "sticky",
  top: 0,
});

const menuItemRule = () => ({
})

const aboutRule = () => ({
  ":before": {
    content: '", "'
  }
})

function Nav(props) {
  const homeRef = useRef();
  const { setNavHeight, filterRoutes } = props;
  const { css } = useFela();
  const location = useLocation();

  function handleOnResize() {
    const { height } = homeRef.current.getBoundingClientRect();
    console.log(height)
    setNavHeight(height + 20);
  }

  useEffect(() => {
    handleOnResize()
  }, [location])

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
          <Link to={"/"}>no design foundry</Link>
          <Link to={"/about"} className={css(aboutRule)}>about</Link>
        </li>
        {location.pathname !== "/" &&
          filterRoutes.map((route, index) => (
            <li key={`nav_${index}`} className={css(menuItemRule)}>
              <Link to={route.route}>{route.title}</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Nav;
