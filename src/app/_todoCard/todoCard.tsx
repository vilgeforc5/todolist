import { useTodosDispatch } from "../todosContext/todosHooksContext"
import { addTasks, editTodo, moveToEnd, removeTask, toggleCompletion } from "../todosContext/todosReducer"
import { createInset } from "../utils/createInset"
import { TodoActionBar } from "./todoActionBar"
import { TodoCardProps } from "./todoCard.types"
import { TodoCardTasks } from "./todoCardTasks"
import { TodoCardTitle } from "./todoCardTitle"
import { TodoCardEditingSection } from "./todoCardEditingSection"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrayElement, TodoItem } from "../types"
import { IconCheck } from "../icons/iconCheck"
import { IconDelete } from "../icons/iconDelete"
import { TodoAddTask } from "./todoAddTask"

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

    const dispatchToggleTaskCompletion = (taskTitle: string) => {
        dispatchTodos(toggleCompletion({
            todoTitle: todoItem.title,
            taskTitle
        }))
    }

    const dispatchTodoChangesEditing = () => {
        dispatchTodos(removeTask({
            todoName: todoItem.title,
            taskDelete: todoChanges.tasksToDelete
        }))
        dispatchTodos(editTodo(todoChanges));
        dispatchTodos(addTasks(todoChanges.tasksToAdd, todoItem.title))
    }

    const [todoChanges, setTodoChanges] = useState(createInitTodosChanges(todoItem))

    const changeEditingTodoTitle = (newTitle: string) => {
        setTodoChanges(p => ({
            ...p,
            newTitle: newTitle
        }))
    }
    const changeEditingTodoTaskTitle = (todoPiece: ArrayElement<TodoItem["tasksTodo"]>, newTitle: string) => {
        setTodoChanges(p => ({
            ...p,
            tasksTodo: todoChanges.tasksTodo ?
                [
                    ...todoChanges.tasksTodo.map(task => {
                        if (task.title !== todoPiece.title) return task
                        return ({
                            ...task,
                            newTitle
                        })
                    })
                ]
                : []
        }))
    }
    const changeEditingTaskDelete = (taskTitle: string) => {
        if (todoChanges.tasksTodo?.length === 1) return 
        setTodoChanges(p => ({
            ...p,
            tasksToDelete: [
                ...p.tasksToDelete,
                taskTitle
            ]
        }))
        if (todoChanges.tasksTodo) {
            setTodoChanges(p => ({
                ...p,
                tasksTodo: todoChanges.tasksTodo!.filter(task => {
                    if (task.title !== taskTitle) return true
                    console.log(task)

                    return false
                })
            }))
        }
    }
    const addEditingNewTask = (newTodoTitle: string) => {
        const taskPresent = todoChanges.tasksTodo?.find(task => task.title === newTodoTitle)
        if (!taskPresent) {
            setTodoChanges(p => ({
                ...p,
                tasksTodo: p.tasksTodo === undefined ?
                    [{ title: newTodoTitle, isCompleted: false }] :
                    [
                        ...p.tasksTodo,
                        {
                            title: newTodoTitle,
                            isCompleted: false,
                            newTitle: newTodoTitle
                        }
                    ],
                tasksToAdd: [
                    ...p.tasksToAdd,
                    {
                        title: newTodoTitle,
                        isCompleted: false
                    }
                ]
            }))
        }
    }
    const inputTitleRef = useRef<HTMLInputElement>(null)

    // when entering editing mode should focus title field
    useEffect(() => {
        if (inputTitleRef && inputTitleRef.current !== null)
            inputTitleRef.current.focus()
    }, [editing.isEditing])

    // when re-entering editing mode shouldn't see previous changes
    useLayoutEffect(() => {
        setTodoChanges(createInitTodosChanges(todoItem))
    }, [editing, todoItem])

    const isItemCompleted = todoItem.tasksTodo.filter(task => task.isCompleted !== true).length !== 0 ? false : true
    const isTodoCompletedNotEditing = isItemCompleted && !editing.isEditing

    return (
        <article
            style={{
                inset: shift ? createInset(shift) : "",
                zIndex
            }}
            className={`${cn} ${isTodoCompletedNotEditing ? "bg-green-50" : "bg-slate-50"}
                        w-full h-full rounded-lg 
                        group`
            }
        >
            <div
                className={`${shouldMove ? "group-hover:-translate-x-1/4" : ""} 
                            ${shouldMove ? "hover:shadow-none" : ""}
                            ${isTodoCompletedNotEditing ? "bg-green-50" : "bg-slate-50"}
                            flex flex-col h-full
                            shadow-sm shadow-blue-500
                            p-1.5 lg:p-2.5 xl:p-4
                            transition-all rounded-lg
                            overflow-y-scroll`
                }
            >
                {editing.isEditing ?
                    <TodoCardEditingSection
                        cn="mb-2 h-10"
                        stopEditing={() => {
                            editing.setIsEditing(false)
                        }}
                        commitEditing={() => {
                            dispatchTodoChangesEditing()
                        }}
                    /> :
                    <TodoActionBar
                        cn="mb-2 h-10 "
                        selectActive={selectActiveItem}
                        isActiveTodo={isActiveTodo}
                        isCompleted={isItemCompleted}
                        setIsEditing={() => { 
                            editing.setIsEditing(true) 
                        }}
                    />
                }
                <TodoCardTitle
                    title={!editing.isEditing ? 
                        todoItem.title :
                        <input
                            ref={inputTitleRef}
                            className="p-1 outline-none border-2 border-dotted border-blue-500 text-center w-full"
                            value={todoChanges.newTitle}
                            onChange={(e) => {
                                changeEditingTodoTitle(e.target.value)
                            }}
                        />
                    }
                    isCompleted={isTodoCompletedNotEditing}
                    cn="text-xl lg:text-3xl font-semibold text-center mb-4"
                />
                <TodoCardTasks
                    taskClassname={isTodoCompletedNotEditing ? "bg-green-100" : "bg-zinc-100"}
                    tasks={!editing.isEditing ?
                        todoItem.tasksTodo :
                        todoChanges.tasksTodo ?? []
                    }
                    renderTitle={(todoPiece) => {
                        if (!editing.isEditing) {
                            return (
                                <p
                                    className={`${todoPiece.isCompleted ? 
                                                "line-through text-slate-800" : 
                                                "text-slate-950"} 
                                                text-2xl font-light`
                                              }
                                >
                                    {todoPiece.title}
                                </p>
                            )
                        }
                        return (
                            <input
                                className="p-1 outline-none border-2 border-dotted border-blue-500 
                                           text-2xl font-light w-full text-slate-950"
                                value={todoChanges.tasksTodo?.find(task => task.title === todoPiece.title)?.newTitle || ""}
                                onChange={(e) => {
                                    changeEditingTodoTaskTitle(todoPiece, e.target.value)
                                }}
                            />
                        )
                    }}
                    renderIcon={(todo) => {
                        if (!editing.isEditing) {
                            return (
                                <IconCheck
                                    cn={`${todo.isCompleted ? 
                                        "text-green-500 hover:text-green-400" :
                                        "text-slate-500 hover:text-slate-400"} 
                                         w-6 h-6 cursor-pointer`
                                       }
                                />)
                        } else {
                            return (
                                <IconDelete
                                    cn={`text-red-600 hover:text-red-400
                                         w-6 h-6 cursor-pointer`
                                    }
                                />
                            )
                        }
                    }}
                    onCompleteClick={(taskTitle) => {
                        if (!editing.isEditing) {
                            dispatchToggleTaskCompletion(taskTitle)
                        } else {
                            changeEditingTaskDelete(taskTitle)
                        }
                    }}
                />
                {editing.isEditing ?
                    <TodoAddTask
                        cn="mb-2"
                        addTodo={(newTodoTitle) => {
                            addEditingNewTask(newTodoTitle)
                        }}
                    /> :
                    <></>
                }
            </div>
        </article>
    )
}

function createInitTodosChanges(todoItem: TodoItem): Parameters<typeof editTodo>["0"] & { tasksToDelete: string[]; tasksToAdd: TodoItem["tasksTodo"] } {
    return ({
        tasksToAdd: [],
        tasksToDelete: [],
        prevTodoTitle: todoItem.title,
        newTitle: todoItem.title,
        tasksTodo: [...todoItem.tasksTodo.map(task => {
            return ({
                ...task,
                newTitle: task.title
            })
        })]
    })
}