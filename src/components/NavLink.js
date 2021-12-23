import React from 'react'
import Link from './Link'

function NavLink(props) {
    const {to, className} = props
    function isActive(pattern, location){
        console.log(pattern, location)
    }
    return (
        <Link to={to} className={className} NavLink={true} isActive={isActive}>{props.children}</Link>
    )
}

export default NavLink
