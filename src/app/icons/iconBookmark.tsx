import React from 'react'
import { IconProps } from './icon.types'

export const IconBookmark = ({ cn, onClick }: IconProps) => {
    return (
        <svg
            className={`${cn}`}
            onClick={() => {
                if(onClick) onClick()
            }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>

    )
}
