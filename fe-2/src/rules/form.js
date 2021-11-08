export const inputValidityRule = ({isValid}) => ({
  position: "relative",
  overflow: "hidden",
  ":after": {
    pointerEvents: "none",
    content: '""',
    position: "absolute",
    top: 0,
    width: "100%",
    bottom: "2px",
    left: "-100%",
    borderBottom: "2px solid red",
    transition: "left .25s ease-in"
  },
  extend: {
    color: "red",
    condition: !isValid,
    style: {
      ":after": {
        left: 0
      }
    }
  }
})

export const labelValidityRule = ({isValid}) => ({
  extend: {
    condition: !isValid,
    style: {
      color: "red"
    }
  }
})