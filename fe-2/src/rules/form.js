export const labelRule = () => ({
  marginRight: "3ch"
  // gridColumn: "2",
})

export const inputRule = () => ({
  // gridColumn: "1"
})


export const labelValidityRule = ({isValid}) => ({
  extend: {
    condition: !isValid,
    style: {
      color: "red"
    }
  }
})