import React, { useEffect, useRef } from 'react'
import { useFela } from 'react-fela'

const navRule = () => ({
    fontFamily: "test",
    padding: "10px",
})

function Nav(props) {
    const containerRef = useRef()
    const {setNavHeight } = props
    const {css} = useFela()

    function handleOnResize() {
        const {offsetHeight:height} = containerRef.current
        console.log(height)
        setNavHeight(height)
    }

    useEffect(() => {
        handleOnResize()
        window.addEventListener("resize", handleOnResize)
        return () => {
            window.removeEventListener("resize", handleOnResize)
        }
    }, [])


    return (
        <nav ref={containerRef} className={css(navRule)}>
            {props.children}
        </nav>
    )
}

export default Nav
