import React from 'react'
import { useFela } from 'react-fela'
import { padding } from '../rules/generic'

function DetailViewDescription() {
    const {css} = useFela()
    return (
        <div className={css(padding("10px"))}>
            this is description
        </div>
    )
}

export default DetailViewDescription
