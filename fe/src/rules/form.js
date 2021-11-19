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