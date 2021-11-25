import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function (props) {
    const {to} = props
    return (
        <Link to={to}>
            {props.children}
        </Link>
    )
}

