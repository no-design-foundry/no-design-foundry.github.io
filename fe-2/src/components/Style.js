import React from "react"

function Style(props) {
  return (
    <style>
      {`
      @font-face {
        font-family: 'preview-output-font';
        src: url(data:font/truetype;charset=utf-8;base64,${props.children}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
`}
    </style>
  )
}

export default Style
