import React, { useRef, useState } from "react";
import { useFela } from "react-fela";
import { padding } from "../rules/generic";

const formRule = () => ({
    height: 0,
    transition: "height 1s ease-in",
    overflow: "hidden"
})

function GetFontForm(props) {
  const formRef = useRef();
  const {css} = useFela()
    const [currentSize, setCurrentSize] = useState(null)

  function handleOnSubmit(e) {
    e.preventDefault();
  }

  function handleOnClick(e) {
    const {scrollHeight} = formRef.current
    console.log(scrollHeight)
  }

  return (
    <div>
      <button disabled={false} onClick={handleOnClick}>get</button>
      <form
        ref={formRef}
        className={css(formRule, padding("10px"))}
        onsubmit={handleOnSubmit}
      >
          {props.children}
      </form>
    </div>
  );
}

export default GetFontForm;
