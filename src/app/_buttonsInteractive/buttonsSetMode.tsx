import { useTodoListModeContext } from "../_todoListModes/todoTodoListModesContext"

export const ButtonsSetMode = () => {
    const { mode, setMode } = useTodoListModeContext()
    return (
        <>
            <button
                disabled={mode === "all"}
                className={`${mode === "all" ? "bg-orange-400 border-2 border-blue-500" : "bg-orange-600"} 
                            text-md md:text-lg text-white rounded-lg bg-orange-600  p-1 md:p-1.5 shadow-md shadow-orange-900`
                            }
                onClick={() => { setMode("all") }}
            >
                Все
            </button>
            <button
                disabled={mode === "completed"}

                className={`${mode === "completed" ? "bg-orange-400 border-2 border-blue-500" : "bg-orange-600"} 
                            text-md md:text-lg text-white rounded-lg bg-orange-600  p-1 md:p-1.5 shadow-md shadow-orange-900`
                            }
                onClick={() => { setMode("completed") }}
            >
                Только законченные
            </button>
            <button
                disabled={mode === "notCompleted"}

                className={`${mode === "notCompleted" ? "bg-orange-400 border-2 border-blue-500" : "bg-orange-600"} 
                            text-md md:text-lg text-white rounded-lg bg-orange-600  p-1 md:p-1.5 shadow-md shadow-orange-900`
                            }
                onClick={() => { setMode("notCompleted") }}
            >
                Только незаконченные
            </button>
        </>
    )
}