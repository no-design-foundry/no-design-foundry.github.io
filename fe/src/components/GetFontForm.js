import React, { useRef, useState, useEffect } from "react";
import { useFela } from "react-fela";
import { margin, padding } from "../rules/generic";
import AnimateHeight from "react-animate-height";
import { formRule } from "../rules/form";
import TextInput from "./TextInput";


var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;


function GetFontForm(props) {
  const { visible } = props;
  const formRef = useRef();
  const { css } = useFela();

  useEffect(() => {
    if (visible) {
      const {height} = formRef.current.getBoundingClientRect()
      scroll.scrollMore(height, {duration: 250})
    }
  }, [visible])

  function handleOnSubmit(e) {
    e.preventDefault();
  }

  return (
    <AnimateHeight height={visible ? "auto" : 0}>
      <form
        ref={formRef}
        className={css(formRule, padding("10px"))}
        onsubmit={handleOnSubmit}
      >
        <TextInput title="font name" name="font-name" defaultValue="default"></TextInput>
      </form>
    </AnimateHeight>
  );
}

export default GetFontForm;
