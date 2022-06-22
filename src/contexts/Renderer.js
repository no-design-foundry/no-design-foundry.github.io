import React from "react";
import { createRenderer } from "fela";
import { RendererProvider } from "react-fela";
import extend from 'fela-plugin-extend'
import multipleSelectors from 'fela-plugin-multiple-selectors'


const renderer = createRenderer({
  plugins: [
    extend(),
    multipleSelectors()
  ]
});

export default ({children}) => (
  <RendererProvider renderer={renderer}>
    {children}
  </RendererProvider>
);
