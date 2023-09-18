import { IconProps } from "./icon.types"

export const IconCheck = ({cn, onClick}: IconProps) => {
    return (
        <svg
        className={`${cn}`}
        onClick={() => {
            if(onClick) onClick()
        }}

        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>

    )
}