import { useTodosDispatch } from "../todosContext/todosHooksContext"
import {  moveToEnd, toggleCompletion } from "../todosContext/todosReducer"
import { createInset } from "../utils/createInset"
import { TodoActionBar } from "./todoActionBar"
import { TodoCardProps } from "./todoCard.types"
import { TodoCardTasks } from "./todoCardTasks"
import { TodoCardTitle } from "./todoCardTitle"
import { TodoCardEditingSection } from "./todoCardEditingSection"

/**
 * 
 * @param cn - just classname 
 * @param todoItem - Todo to be displayed 
 * @param shift - Shift need to be applied if stacked with absolute
 * @param shouldMove - Determines wether card should move on hover. For example, active Card shouldn't and if edited also
 * @param zIndex - zIndex for absolute positioning
 * @param isActiveTodo - if todo is active allows Toolbar to trigger actions
 * @param editing - set that current card is edited. For example, can be used to restrict other cards to move
 */
export const TodoCard = ({ cn, todoItem, shift, shouldMove, zIndex, isActiveTodo, editing }: TodoCardProps) => {
    const { dispatchTodos } = useTodosDispatch()
    const selectActiveItem = () => {
        dispatchTodos(moveToEnd(todoItem.title))
    }
    const isItemCompleted = todoItem.tasksTodo.filter(task => task.isCompleted !== true).length !== 0 ? false : true
    return (
        <article
            style={{
                inset: shift ? createInset(shift) : "",
                zIndex
            }}
            className={`${cn} ${isItemCompleted && !editing.isEditing ? "bg-green-50" : "bg-slate-50"}
                        w-full h-full rounded-lg 
                        group`
            }
        >
            <div
                className={`${shouldMove ? "group-hover:-translate-x-1/4" : ""} 
                            ${shouldMove ? "hover:shadow-none" : ""}
                            ${isItemCompleted && !editing.isEditing ? "bg-green-50" : "bg-slate-50"}
                            flex flex-col h-full
                            shadow-sm shadow-blue-500
                            p-1.5 lg:p-2.5 
                            transition-all rounded-lg`
                }
            >
                {editing.isEditing ?
                    <TodoCardEditingSection
                        stopEditing={() => { editing.setIsEditing(false) }}
                        cn="mb-2 h-10"
                    /> :
                    <TodoActionBar
                        cn="mb-2 h-10 "
                        selectActive={selectActiveItem}
                        isActiveTodo={isActiveTodo}
                        isCompleted={isItemCompleted}
                        setIsEditing={() => {editing.setIsEditing(true)}}
                    />
                }
                <TodoCardTitle
                    title={todoItem.title}
                    isCompleted={isItemCompleted && !editing.isEditing}
                    cn="text-xl lg:text-3xl font-semibold text-center mb-4"
                />
                <TodoCardTasks
                    tasks={todoItem.tasksTodo}
                    renderTitle={(title) => title}
                    onCompleteClick={(taskTitle) => {
                        dispatchTodos(toggleCompletion({
                            todoTitle: todoItem.title,
                            taskTitle
                        }))
                    }}
                />
            </div>
        </article>
    )
}



