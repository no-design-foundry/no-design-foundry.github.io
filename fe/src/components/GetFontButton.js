import React from 'react'

function GetFontButton(props) {
    const {disabled} = props
    return (
        <div>
            <button disabled={disabled}>download</button>
        </div>
    )
}

export default GetFontButton
