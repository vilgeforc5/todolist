import { IconProps } from "./icon.types"

export const IconDelete = ({cn, onClick}: IconProps) => {
    return (
        <svg 
            className={`${cn}`} 
            onClick={() => {
                if(onClick) onClick()
            }}
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>

    )
}