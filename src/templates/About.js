
import React from 'react'
import Markdown from 'markdown-to-jsx';
import rasterizer from '../abouts/rasterizer.js';
import rotorizer from '../abouts/rotorizer.js';
import foundry from '../abouts/foundry.js';
import { useFela } from 'react-fela';

const abouts = {
    rasterizer, rotorizer, foundry
}

const articleRule = () => ({
    padding: "calc(1em - 10px) 10px 10px 10px",
    maxWidth: "50ch",
    "& p + p": {
        marginTop: "1em",
    }
})

function About(props) {
    const {identifier} = props
    const {css} = useFela()
    return (
        <article className={css(articleRule)}>
            <Markdown>{abouts[identifier]}</Markdown>
        </article>
    )
}

export default About
