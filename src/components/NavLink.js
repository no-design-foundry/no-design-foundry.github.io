import React from 'react'
import { useFela } from 'react-fela'
import { useLocation } from 'react-router-dom'
import Link from './Link'

const linkRule = ({pathname, condition}) => ({
    extend: [{
        condition: condition(pathname),
        style: {
            textDecoration: "underline !important",
        }
    }]
})

function NavLink(props) {
    const {to, className = "", condition = (pathname) => {
        return pathname.startsWith(to)
    }} = props
    const location = useLocation()
    const {css} = useFela({pathname: location.pathname, to, condition})

    return (
        <Link to={to} className={`${css(linkRule)} ${className}`}>{props.children}</Link>
    )
}

export default NavLink
