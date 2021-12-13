import React from "react";

function Log(props) {
  const { content } = props;
  return <ul>
    {content.map((message, index) => <li key={index}>{message}</li>)}
  </ul>;
}

export default Log;
