import React from 'react'
import { useFela } from 'react-fela'
import { padding } from '../rules/variables'

const rule = ({}) => ({
    padding,
    marginTop: "auto"
})

function Footer() {
    const {css} = useFela()
    return (
        <footer className={css(rule)}>
            info@nodesignfoundry.com         
        </footer>
    )
}

export default Footer
