export const relative = () => ({
    position: "relative"
})

export const padding = (value) => () => ({
    padding: value
})

export const height = (value) => () => ({
    height: value
})

export const width = (value) => () => ({
    width: value
})

export const flex = (value_a, value_b) => () => ({
    display: "flex",
    alignItems: value_a,
    justifyContent: value_b
})