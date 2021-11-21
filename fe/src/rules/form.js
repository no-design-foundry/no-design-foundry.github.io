export const formRule = () => ({
  display: "grid",
  width: "500px",
  gridTemplateColumns: "1fr auto auto 3ch",
  gridAutoRows: "1.5em",
  alignItems: "center",
  gap: "0px 10px",
});

export const labelRule = () => ({
  gridColumn: "1",
  whiteSpace: "nowrap"
})

export const inputRule = () => ({
  gridColumn: "3",
  width: "100%",
  "> input": {
    width: "100%",
  }
})

export const inputValidityRule = ({isValid}) => ({
  extend: {
    condition: !isValid,
    background: "red"
  }
})

export const disabledTextInputRule = ({disabled}) => {
  if (disabled) {
    return {
      color: "silver"
    }
  }
  else {
    return {}
  }
}



export const labelValidityRule = ({isValid}) => ({
  // extend: {
  //   condition: !isValid,
  //   style: {
  //     color: "red"
  //   }
  // }
})