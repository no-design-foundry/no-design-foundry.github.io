import React from 'react'

function EmailInput(props) {
    const {label} = props
    return (
        <div>
            <label>{label}</label>
            <input type="email"></input>
        </div>
    )
}

export default EmailInput
