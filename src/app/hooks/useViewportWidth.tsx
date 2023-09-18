import { useState, useEffect } from "react";

const getCurrentWidth = () => {
    return window.innerWidth
}

export const useViewportWidth = () => {
    const [width, setWidth] = useState(getCurrentWidth())
    useEffect(() => {
        const setWidthOnResize = () => {
            setWidth(getCurrentWidth())
        }
        window.addEventListener("resize", setWidthOnResize)
        return () => {
            window.removeEventListener("resize", setWidthOnResize)
        }
    })
    
    return {
        width
    }
}