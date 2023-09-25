import React from "react";
import { useFela } from "react-fela";
import { Link, useLocation } from "react-router-dom";
import data from "../data";

const linkRule = ({ linkActive, aboutLinkActive, isHome, identifier, variableSliders }) => ({
  position: "relative",
  extend: [
    {
      condition: linkActive || aboutLinkActive,
      style: {
        textDecoration: "underline !important",
      },
    },
    {
      condition: isHome,
      style: {
        fontSize: "100px",
        portrait: {
          fontSize: "60px",
        },
        lineHeight: 1.07,
        "& > *:not(:first-child)": {
          position: "absolute",
          left: 0,
          top: 0,
        },
      },
    },
    {
      condition: variableSliders || true,
      style: {
        fontVariationSettings: `"RTTX" 33`
      }
    }
  ],
});

const layerRule = (index, color) => ({identifier}) => ({
  fontFamily: `${identifier}-${index}`,
  extend: [{
    condition: index !== 0,
    style: {
      color: "#55F"
    }
  }]
})

const aboutLinkRule = ({ aboutLinkActive }) => ({
  extend: {
    condition: aboutLinkActive,
    style: {
      textDecoration: "underline !important",
    },
  },
});

const navRule = () => ({
  marginBottom: "1em",
  position: "sticky",
  top: 0,
});

function NavLink({ to, children, colors, identifier }) {
  const toAbout = `${to}/about`;
  let { pathname } = useLocation();
  pathname = pathname.replace(/\/$/, "");
  const isHome = !pathname.length;
  const { css } = useFela({
    linkActive: pathname === to,
    aboutLinkActive: pathname === toAbout,
    isHome,
    identifier
  });
  return (
    <>
      <Link to={to} className={css(linkRule)}>
        {
          (isHome && colors) ? colors.map((color, index) => <span className={css(layerRule(index, color))}>{children}</span>) : children
        }
      </Link>
      {(pathname === to || pathname === toAbout) && (
        <>
          <span>, </span>
          <Link to={toAbout} className={css(aboutLinkRule)}>
            about
          </Link>
        </>
      )}
    </>
  );
}

function Nav() {
  let { pathname } = useLocation();
  pathname = pathname.replace(/\/$/, "");
  const { css } = useFela();
  return (
    <nav className={css(navRule)}>
      <ul>
        <li>
          <NavLink to="">no design foundry</NavLink>
        </li>
        {data
          .filter((filter) => filter.type === "filterDetailView")
          .map((filter) => (
            <li key={filter.identifier}>
              <NavLink
                to={filter.route}
                colors={filter.layerColors}
                identifier={filter.identifier}
                variableSliders={filter.variableFontControlSliders}
              >
                {filter.title}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Nav;
