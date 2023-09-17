import { ReactNode, createContext, useReducer } from "react";
import { todosListReducer } from "./todosReducer";
import { ActionTypes } from "./todosReducer.types";
import { TodoList } from "../types";

const initialTodos: TodoList = [
    {
        title: "Третий тодо!",
        tasksTodo: [
            {
                title: "Тесттт",
                isCompleted: true
            },
        ]
    },
    {
        title: "ВТОРОЙ ТУДУ!",
        tasksTodo: [
            {
                title: "Привки",
                isCompleted: true
            },
            {
                title: "Потестисть",
                isCompleted: false
            }
        ]
    },
    {
        title: "Создайте ваш первый todo!",
        tasksTodo: [
            {
                title: "Запустить приложение",
                isCompleted: true
            },
            {
                title: "Потестисть фичи",
                isCompleted: false
            }
        ]
    },

];

export const TodosDataContext = createContext(initialTodos)
export const TodosDispatchContext = createContext<{ dispatchTodos: React.Dispatch<ActionTypes> }>
    ({ dispatchTodos: () => null })

export const TodosContext = ({ children }: { children: ReactNode }) => {
    const [todosList, dispatchTodos] = useReducer(todosListReducer, initialTodos)
    return (
        <TodosDataContext.Provider value={todosList}>
            <TodosDispatchContext.Provider value={{dispatchTodos}}>
                {children}
            </TodosDispatchContext.Provider>
        </TodosDataContext.Provider>
    )
}
