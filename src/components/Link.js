import React, { useContext } from "react";
import { useFela } from "react-fela";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ContentVisibilityContext } from "../App";

const linkRule = () => ({
  "-webkit-tap-highlight-color": "transparent",
});

export default function (props) {
  const { to, className = "" } = props;
  const setContentIsVisible = useContext(ContentVisibilityContext);
  const navigate = useNavigate();
  const { css } = useFela();

  function delayAndGo(e) {
    e.preventDefault();
    setContentIsVisible(false);
    setTimeout(() => {
      navigate(to);
      setContentIsVisible(true);
    }, 350 + 50);
  }
  const params = {
    to,
    onClick: delayAndGo,
    className: `${css(linkRule)} ${className}`,
  };
  return (
    <NavLink {...params}>{props.children}</NavLink>
    // ) : (
    // <Link {...params}>{props.children}</Link>
  );
}
