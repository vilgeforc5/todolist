import  { ReactNode } from 'react'

export const CardToolbar = ({ cn, children }: { cn?: string, children: ReactNode }) => {
    return (
        <div className={`${cn} w-full flex items-center justify-start gap-x-1`}>
            {children}
        </div>
    )
}