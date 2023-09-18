import { CardTitleProps } from './cardTitle.types'

export const CardTitle = ({cn, isCompleted, title}: CardTitleProps) => {
    return (
        <p
            className={`${cn} ${isCompleted ? "line-through text-zinc-800" : "text-zinc-800"}
        `}>
            {title}
        </p>
    )
}
