import { CardTodoData } from './_cardTodoData/cardTodoData'
import { IconCheck } from '../icons/iconCheck'
import { CardTodoProps } from './cardTodo.types'
import { toggleCompletion } from '../todosContext/todosReducer';
import { useTodosDispatch } from '../todosContext/todosHooksContext';
import { IconBookmark } from '../icons/iconBookmark';
import { IconEdit } from '../icons/iconEdit';
import { IconIsCompleted } from '../icons/iconIsCompleted';
import { CardToolbar } from './_cardTodoData/toolbar/cardToolbar';

type CardTodoDataViewProps = Pick<CardTodoProps, "data" | "isActive"> & {
    cn?: string;
    isCompleted: boolean;
    setActive: () => void;
    setIsEditing: () => void;
} 

export const CardTodoDataView = ({ data, setIsEditing, isActive, isCompleted, setActive, cn }: CardTodoDataViewProps) => {
    const { dispatchTodos } = useTodosDispatch()
    const dispatchToggleTaskCompletion = (taskTitle: string) => {
        dispatchTodos(toggleCompletion({
            todoTitle: data.title,
            taskTitle
        }))
    }

    return (
        <CardTodoData
            cn={cn}
        >
            <CardToolbar>
                <button
                    disabled={isActive}
                    onClick={() => {
                        setActive()
                    }}
                >
                    {/* fill={`${isActive ? "rgb(249, 115, 22)" : "none"}`} */}
                    <IconBookmark
                        cn={`${isActive ?
                            "text-orange-500 cursor-default" :
                            "text-blue-950 hover:text-orange-500 cursor-pointer"
                            }
                         w-6 h-6 lg:w-7 lg:h-7`
                        }
                    />
                </button>
                <button
                    disabled={!isActive}
                    onClick={() => {
                        setIsEditing()
                    }}
                >
                    <IconEdit
                        cn={`${!isActive ? "cursor-not-allowed" : "cursor-pointer hover:text-slate-700"}
                        w-6 h-6 lg:w-7 lg:h-7 text-slate-950 `
                        }
                    />
                </button>
                <button className="ml-auto">
                    <IconIsCompleted
                        cn={`${isCompleted ? "text-green-500" : "text-slate-500"}
                        w-6 h-6 lg:w-7 lg:h-7 cursor-default`
                        }
                    />
                </button>

            </CardToolbar>
            <CardTodoData.Title
                cn="text-xl lg:text-3xl font-semibold text-center mb-4"
                isCompleted={isCompleted}
                title={data.title}
            />
            <CardTodoData.Tasks
                tasks={data.tasksTodo}
                onCompleteClick={(taskTitle) => {
                    dispatchToggleTaskCompletion(taskTitle.title)
                }}
                renderIcon={(todo) => (
                    <IconCheck
                        cn={`${todo.isCompleted ?
                            "text-green-500 hover:text-green-400" :
                            "text-slate-500 hover:text-slate-400"} 
                                     w-6 h-6 cursor-pointer`
                        }
                    />)}

                renderTitle={(todo) => (
                    <p
                        className={`${todo.isCompleted ?
                            "line-through text-slate-800" :
                            "text-slate-950"} 
                                        text-2xl font-light`
                        }
                    >
                        {todo.title}
                    </p>
                )}
                taskClassname={`${isCompleted ? "bg-green-100" : "bg-slate-100"}`}
            />
        </CardTodoData>
    )
}
