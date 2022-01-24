import React, { useState, useEffect } from "react";
import { useFela } from "react-fela";
import { useLocation } from "react-router-dom";

const rule = ({ mounted }) => ({
  transition: "opacity .22s ease-in",
  opacity: mounted ? 1 : 0,
});

export default function PageFade(props) {
  const [mounted, setMounted] = useState(false);

  const { css } = useFela({ mounted });

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false)
    }
  }, []);


  return <div className={css(rule)}>{props.children}</div>;
}
