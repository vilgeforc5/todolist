import { useState } from "react"
import { TodoCard } from "../_todoCard/todoCard"
import { TodosContainerProps } from "./todosContainer.types"

export const TodosContainer = ({ todosList }: TodosContainerProps) => {
    const [isTodoEdited, setIsTodoEdited] = useState(false)

    return (
        <div className="relative h-[400px] w-full mt-8">
            {todosList.map((todo, index) => {

                // determines wether Todo allowed.
                // 1) if todo is active - restricted
                // 2) if todo is edited - restricted for all
                // 3) default - allowed for all todos but active
                let shouldMove = false
                if (isTodoEdited) {
                    shouldMove = false
                } else {
                    shouldMove = index !== todosList.length - 1
                }

                return <TodoCard
                    shouldMove={shouldMove}
                    cn={`absolute`}
                    shift={{
                        top: index * 10,
                        left: index * 10
                    }}
                    isActiveTodo={index === todosList.length - 1}
                    zIndex={index}
                    key={todo.title}
                    todoItem={todo}
                    editing={{ isEditing: isTodoEdited, setIsEditing: setIsTodoEdited }}
                />
            })}
        </div>
    )
}