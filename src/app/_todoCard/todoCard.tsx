import { ComponentProps, useState } from "react"
import { useTodosDispatch } from "../todosContext/todosHooksContext"
import { moveToEnd } from "../todosContext/todosReducer"
import { createInset } from "../utils/createInset"
import { TodoActionBar } from "./todoActionBar"
import { TodoCardProps } from "./todoCard.types"

export const TodoCard = ({ cn, todoItem, shift, shouldMove, zIndex, isActiveTodo }: TodoCardProps) => {
    const { dispatchTodos } = useTodosDispatch()
    const selectActiveItem = () => {
        dispatchTodos(moveToEnd(todoItem.title))
    }

    const [isEditing, setIsEditing] = useState(false)

    return (
        <article
            style={{
                inset: shift ? createInset(shift) : "",
                zIndex
            }}
            className={`${cn} ${todoItem.isCompleted ? "bg-green-50" : "bg-slate-50"}
                        w-full h-full rounded-lg 
                        group`
            }
        >
            <div
                className={`${shouldMove ? "group-hover:-translate-x-1/2" : ""} 
                            ${shouldMove ? "hover:shadow-none" : ""}
                            ${todoItem.isCompleted ? "bg-green-50" : "bg-slate-50"}
                            flex flex-col h-full
                            shadow-sm shadow-blue-500
                            p-1.5 lg:p-2.5 
                            transition-all rounded-lg`
                }
            >
                {isEditing ?
                    <EditingSection
                        stopEditing={() => { setIsEditing(false) }}
                        cn="mb-2 h-10"
                    /> :
                    <TodoActionBar
                        cn={`mb-2 h-10 ${isEditing ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                        selectActive={selectActiveItem}
                        isActiveTodo={isActiveTodo}
                        isCompleted={todoItem.isCompleted}
                        setIsEditing={() => { setIsEditing(true) }}
                    />
                }
                <TodoTitle
                    title={todoItem.title}
                    isCompleted={todoItem.isCompleted && !isEditing}
                    cn="text-xl lg:text-3xl font-semibold text-center"
                />
                <TodoTasks tasks={todoItem.tasksTodo} />
            </div>
        </article>
    )
}


const TodoTitle = ({ isCompleted, title, cn }: { isCompleted: boolean, title: string, cn?: string }) => {
    return (
        <p
            className={`${cn} ${isCompleted ? "line-through text-zinc-800" : "text-zinc-800"}
        `}>
            {title}
        </p>
    )
}

const TodoTasks = ({ tasks }: { tasks: ComponentProps<typeof TodoCard>["todoItem"]["tasksTodo"] }) => {
    return (
        <ul>
            {tasks.map(todo => {
                return <li key={todo.title}> {todo.title} </li>
            })}
        </ul>
    )
}

const EditingSection = ({ cn, stopEditing }: { cn?: string, stopEditing: () => void, }) => {
    return (
        <div className={`${cn} flex gap-x-3`}>
            <div className="p-1 px-2 bg-zinc-200 flex justify-center items-center gap-x-1.5 cursor-pointer group/svg">
                <svg
                    className="w-6 h-6 inline-block text-green-500 group-hover/svg:rotate-180 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg font-light">
                    Внести изменения
                </span>
            </div>
            <div
                className="p-1 px-2 bg-zinc-200 flex justify-center items-center gap-x-1.5 cursor-pointer group/svg"
                onClick={() => { stopEditing() }}
            >
                <svg
                    className="w-6 h-6 inline-block text-red-500 group-hover/svg:rotate-180 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg font-light">
                    Отменить изменения
                </span>
            </div>

        </div>
    )
}