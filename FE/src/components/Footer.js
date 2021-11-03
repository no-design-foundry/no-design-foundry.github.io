import React from 'react'
import { useFela } from 'react-fela'

const rule = ({}) => ({
    marginTop: "auto"
})

function Footer() {
    const {css} = useFela()
    return (
        <footer className={css(rule)}>
            footer         
        </footer>
    )
}

export default Footer
