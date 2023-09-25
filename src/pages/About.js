import React from 'react'
import { useFela } from 'react-fela';
import ReactMarkdown from 'react-markdown';
import foundryMarkdown from "../abouts/foundry.md"
import rasterizerMarkdown from "../abouts/rasterizer.md"
import rotorizerMarkdown from "../abouts/rotorizer.md"

const mdRule = () => ({
  maxWidth: "50vw",
  "& > p:not(:last-child)": {
    marginBottom: ".5em"
  },
  portrait: {
    maxWidth: "unset"
  }
})

function getMarkDown(identifier) {
  switch(identifier) {
    case "rotorizer":
      return rotorizerMarkdown
    case "rasterizer":
      return rasterizerMarkdown
    case "home":
      return foundryMarkdown
    default:
      throw new Error("couldn't find markdown")
  }
}

function About({identifier}) {
  const markDown = getMarkDown(identifier)
  const {css} = useFela()
  return (
    <ReactMarkdown children={`${markDown}`} linkTarget="_blank" className={css(mdRule)}/>
  )
}

export default About