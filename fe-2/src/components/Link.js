import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ContentVisibilityContext } from "../App";

export default function ({ to, children }) {
  const setContentIsVisible = useContext(ContentVisibilityContext);

  const navigate = useNavigate();
  
  
  function delayAndGo(e) {

    setContentIsVisible(false)
    setTimeout(() => {
      navigate(to)
      setContentIsVisible(true)
    }, 350)
    e.preventDefault();
  }

  return (
    <Link to={to} onClick={delayAndGo}>
      {children}
    </Link>
  );
}
