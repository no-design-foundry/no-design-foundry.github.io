export const column = (nth) => () => ({
    gridColumn: nth
  })


export const pageFade = ({mounted}) => ({
  transition: "opacity .5s ease-in",
  opacity: mounted ? 1 : 0
})

