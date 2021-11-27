import React from 'react'
import { useFela } from 'react-fela'

const containerRule = ({navHeight}) => ({
    pointerEvents: "all",
    position: "absolute",
    // top: `calc(100vh - ${navHeight}px)`,
    top: "100vh",
    transform: "translateY(-100%)",
    right: 0,
    padding: "10px",
    // zIndex: 10000,
})


function Footer(props) {
    const {navHeight} = props
    const {css} = useFela({navHeight})
    return (
        <footer className={css(containerRule)}>
            <a href="mailto:mail@nodesignfoundry.com">mail@nodesignfoundry.com</a>
        </footer>
    )
}

export default Footer
