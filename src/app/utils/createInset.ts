import { InsetCSS } from "../types"

export const createInset = (inset: InsetCSS) => {
    const insetStr = `${inset.top ? inset.top + "px" + " " : "0"}` + 
                  `${inset.bottom ? inset.bottom + "px" + " " : "0"}` +
                  `${inset.left ? inset.left + "px" + " " : "0"}` + 
                  `${inset.right ? inset.right+ "px" + " " : "0"}`
    return insetStr
}