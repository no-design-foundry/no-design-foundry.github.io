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


export const labelValidityRule = ({isValid}) => ({
  // extend: {
  //   condition: !isValid,
  //   style: {
  //     color: "red"
  //   }
  // }
})