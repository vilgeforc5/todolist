import { useState } from "react"
import { useTodosDispatch } from "../todosContext/todosHooksContext"
import { addTasks, editTodo, moveToEnd, removeTask } from "../todosContext/todosReducer"
import { createInset } from "../utils/createInset"
import { CardTodoEditing } from "./_cardTodoEditing/cardTodoEditing"
import { CardTodoProps } from "./cardTodo.types"
import { CardTodoDataView } from "./cardTodoDataView"

export const CardTodo = ({ cn, data, isActive, shift, zIndex, moving }: CardTodoProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const { dispatchTodos } = useTodosDispatch()

    const setActive = () => {
        dispatchTodos(moveToEnd(data.title))
    }

    const dispatchOnApply = (todoChanges: Parameters<typeof editTodo>[0], tasksToAdd: typeof data["tasksTodo"], tasksToDelete: string[]) => {
        dispatchTodos(addTasks(tasksToAdd, data.title))
        dispatchTodos(removeTask({
            todoName: data.title,
            taskDelete: tasksToDelete
        }))
        dispatchTodos(editTodo(todoChanges));
    }



    const isCompleted = data.tasksTodo.filter(task => task.isCompleted !== true).length !== 0 ? false : true
    const shiftStyles = shift ? createInset(shift) : {}
    const isTodoCompletedNotEditing = isCompleted && !isEditing

    return (
        <article
            style={{
                ...shiftStyles,
                zIndex
            }}
            className={`${cn} ${isTodoCompletedNotEditing ? "bg-green-50" : "bg-slate-50"} 
                        w-full h-full rounded-lg group
                      `}
        >
            <div
                className={`${moving?.shouldMove ?
                    moving.moveDirection === "left" ?
                        "group-hover:-translate-x-1/4" :
                        "group-hover:-translate-y-1/2"
                    : ""
                    } 
                            ${moving?.shouldMove ? "hover:shadow-none" : ""}
                            ${isTodoCompletedNotEditing ? "bg-green-50" : "bg-slate-50"}
                            flex flex-col h-full
                            shadow-sm shadow-blue-500
                            p-1.5 lg:p-2.5 xl:p-4
                            transition-all rounded-lg`
                }
            >

                {!isEditing ?
                    <CardTodoDataView 
                        cn="h-full w-full overflow-y-scroll"
                        data={data}
                        setIsEditing={() => setIsEditing(true)}
                        isCompleted={isCompleted}
                        isActive={isActive}
                        setActive={setActive}
                    /> :
                    <CardTodoEditing 
                        cn="h-full w-full overflow-y-scroll"
                        todo={data}
                        isActive={isActive}
                        setActive={setActive}
                        onUndo={() => {setIsEditing(false)}}
                        onApply={(todoChanges, tasksToAdd, tasksToDelete) => {
                            dispatchOnApply(todoChanges, tasksToAdd, tasksToDelete)
                            setIsEditing(false)
                        }}
                    />
                }
            </div>
        </article>
    )
}

