import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContentVisibilityContext } from "../App";

export default function (props) {
  const { to } = props;
  const setContentIsVisible = useContext(ContentVisibilityContext);
  const navigate = useNavigate();

  function delayAndGo(e) {
    e.preventDefault();
    setContentIsVisible(false);
    setTimeout(() => {
      navigate(to);
      setContentIsVisible(true);
    }, 350);
  }

  return <Link to={to} onClick={delayAndGo}>{props.children}</Link>;
}
