import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

type TodoListModes = 
    | "all"
    | "completed"
    | "notCompleted"

const TodoListModesContext = createContext<{
    mode: TodoListModes,
    setMode: Dispatch<SetStateAction<TodoListModes>>
}>({
    mode: "all",
    setMode: () => {}
})

export const TodoListModeContextWrapper = ({children} : {children: React.ReactNode}) => {
    const [mode, setMode] = useState<TodoListModes>("all")

    return (
        <TodoListModesContext.Provider value={{mode, setMode}}>
            {children}
        </TodoListModesContext.Provider>
    )
}

export const useTodoListModeContext = () => {
    const todoMode = useContext(TodoListModesContext)
    return todoMode
}