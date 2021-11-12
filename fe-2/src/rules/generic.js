export const relative = () => ({
    position: "relative"
})

export const flex = () => ({
    display: "flex"
})

export const grow = () => ({
    flexGrow: "1"
})

export const column = () => ({
    flexDirection: "column"
})

export const row = () => ({
    flexDirection: "row"
})

export const padding = (value) => () => ({
    padding: value
})

export const margin = (value) => () => ({
    margin: value
})


export const minHeight = (value) => () => ({
    minHeight: value
})

export const maxWidth = (value) => () => ({
    maxWidth: value
})


export const flexDirection = (value) => () => ({
    flexDirection: value
})

export const height = (value) => () => ({
    height: value
})

export const width = (value) => () => ({
    width: value
})

export const alignItems = (value) => () => ({
    alignItems: value
})

export const justifyContent = (value) => () => ({
    justifyContent: value
})

