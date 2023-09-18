import { useState } from 'react'
import { CardTodoEditingProps } from './cardTodoEditing.types'
import { IconDelete } from '../../icons/iconDelete'
import { ArrayElement } from '../../types'
import { TodoCardEditingAddTask } from './editingAddTask'
import { CardToolbar } from '../_cardTodoData/toolbar/cardToolbar'
import { IconBookmark } from '../../icons/iconBookmark'
import { IconCheck } from '../../icons/iconCheck'
import { CardTasks } from '../_cardTodoData/tasks/cardTasks'
import { CardTitle } from '../_cardTodoData/title/cardTitle'

export const CardTodoEditing = ({ cn, todo, isActive, setActive, onUndo, onApply }: CardTodoEditingProps) => {
    const [newTitle, setNewTitle] = useState(todo.title)
    const [newTasks, setNewTasks] = useState(() => todo.tasksTodo.map(task => ({
        title: task.title,
        newTitle: task.title,
        isCompleted: task.isCompleted
    })))

    const [tasksAction, setTasksAction] = useState<{tasksToDelete: typeof newTasks, tasksToAdd: typeof newTasks}>({
        tasksToDelete: [],
        tasksToAdd: []
    })

    const changeTaskTitle = (taskChanged: ArrayElement<typeof newTasks>) => {
        if (newTasks.findIndex(task => task.newTitle === taskChanged.newTitle) !== -1) return
        setNewTasks(p => p.map(task => {
            if (task.title !== taskChanged.title) return task
            return {
                isCompleted: task.isCompleted,
                title: task.title,
                newTitle: taskChanged.newTitle
            }
        }))
    }

    const deleteTask = (taskToDelete: ArrayElement<typeof newTasks>) => {
        setNewTasks(p => p.filter(task => task.title !== taskToDelete.title))
    }

    const addTask = (taskTitle: string) => {
        if (newTasks.findIndex(task => task.newTitle === taskTitle) !== -1) return
        setNewTasks(p => [
            ...p,
            {
                isCompleted: false,
                newTitle: taskTitle,
                title: taskTitle
            }
        ])
    }

    return (
        <form 
            className={`${cn}`}
            onSubmit={(e) => {
                e.preventDefault()
                const event = (e.nativeEvent as SubmitEvent).submitter!.getAttribute("name") as "apply" | "undo"
                if (event === "undo") {
                    onUndo()
                } else {
                    onApply(
                        {
                            prevTodoTitle: todo.title,
                            newTitle,
                            tasksTodo: newTasks
                        },
                        tasksAction.tasksToAdd,
                        tasksAction.tasksToDelete.map(task => task.title)
                    )
                }
            }}
        >
            <CardToolbar
                cn='mb-2.5'
            >
                <button
                    disabled={isActive}
                    onClick={() => {
                        setActive()
                    }}
                >
                    <IconBookmark
                        cn={`${isActive ?
                            "text-orange-500 cursor-default" :
                            "text-blue-950 hover:text-orange-500 cursor-pointer"
                            }
                         w-6 h-6 lg:w-7 lg:h-7`
                        }
                    />
                </button>
                <button type='submit' name="apply" className='flex ml-auto bg-green-500 rounded-lg p-1 px-1.5 justify-start items-center'>
                    <IconCheck
                        cn='w-6 h-6 text-slate-50 inline-block'
                    />
                    <span className='text-base lg:text-lg text-slate-50'>
                        Внести
                    </span>
                </button>
                <button type='submit' name="undo" className='flex  bg-red-500 rounded-lg p-1 px-1.5 justify-start items-center'>
                    <IconDelete 
                        cn='w-6 h-6 text-slate-50 inline-block'
                    />
                    <span className='text-base lg:text-lg text-slate-50'>
                        Отменить
                    </span>
                </button>
            </CardToolbar>
            <CardTitle
                title={
                    <input
                        className="p-1 text-center outline-none border-2 border-dotted border-blue-500 
                                   text-2xl font-medium  w-full text-slate-950"
                        value={newTitle}
                        onChange={(e) => {
                            setNewTitle(e.target.value)
                        }}
                    />
                }
                isCompleted={false}
            />
            <CardTasks
                cn='mt-3'
                renderIcon={() => (
                    <IconDelete
                        cn={`text-red-600 hover:text-red-400
                         w-6 h-6 cursor-pointer`
                        }
                    />
                )}
                taskClassname='bg-zinc-100'
                onCompleteClick={task => {
                    deleteTask(task)
                    setTasksAction(p => ({
                        tasksToAdd: p.tasksToDelete.filter(task => task.newTitle !== task.newTitle),
                        tasksToDelete: [
                            ...p.tasksToDelete,
                            {
                                ...task
                            }
                        ]
                    }))
                }}
                renderTitle={(task) => (
                    <input
                        className="p-1 outline-none border-2 border-dotted border-blue-500 
                               text-2xl font-light w-full text-slate-950"
                        value={task.newTitle}
                        onChange={(e) => {
                            changeTaskTitle({
                                ...task,
                                newTitle: e.target.value
                            })
                        }}
                    />
                )}
                tasks={newTasks}
            />
            <TodoCardEditingAddTask
                cn='sticky bottom-0 z-1 rounded-lg bg-slate-50 left-0 right-0'
                addTask={(todoTitle) => {
                    addTask(todoTitle)
                    setTasksAction(p => ({
                        tasksToDelete: p.tasksToDelete.filter(task => task.newTitle !== todoTitle),
                        tasksToAdd: [
                            ...p.tasksToAdd,
                            {
                                isCompleted: false,
                                newTitle: todoTitle,
                                title: todoTitle
                            }
                        ]
                    }))
                }}
            />
        </form>
    )
}
