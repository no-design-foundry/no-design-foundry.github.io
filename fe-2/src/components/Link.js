
import React from "react";
import { Link } from "react-router-dom"

export default function({ to, children }) {
    
    function delayAndGo(e) {
      e.preventDefault();
    window.history.pushState(to)
    }
  
    return (
      <Link to={to} onClick={delayAndGo}>
        {children}
      </Link>
    );
  }