import { CardTasks } from "./tasks/cardTasks"
import { CardTitle } from "./title/cardTitle"
import { CardTodoDataProps } from "./cardTodoData.types"
import { CardToolbar } from "./toolbar/cardToolbar"

 export const CardTodoData = ({cn, children}: CardTodoDataProps) => {
    return (
        <div
            className={`${cn}`}
        >
            {children}
        </div>
    )
}

CardTodoData.Title = CardTitle;
CardTodoData.Toolbar = CardToolbar;
CardTodoData.Tasks = CardTasks;