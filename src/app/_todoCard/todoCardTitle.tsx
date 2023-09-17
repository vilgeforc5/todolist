import { ReactNode } from "react"

export const TodoCardTitle = ({ isCompleted, title, cn }: { isCompleted: boolean, title: ReactNode, cn?: string }) => {
    return (
        <p
            className={`${cn} ${isCompleted ? "line-through text-zinc-800" : "text-zinc-800"}
        `}>
            {title}
        </p>
    )
}
