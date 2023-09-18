import { InsetCSS } from "../types"

export const createInset = (shift: InsetCSS) => {
    return {
        top: shift?.top || "auto",
        bottom: shift?.bottom || "auto",
        right: shift?.right || "auto",
        left: shift?.left || "auto",
    }
}