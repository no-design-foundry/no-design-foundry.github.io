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
  return (
    <Link to={to} onClick={delayAndGo} className={className}>
      {props.children}
    </Link>
  );
}
