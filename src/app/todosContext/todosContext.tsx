import { ReactNode, createContext, useReducer } from "react";
import { todosListReducer } from "./todosReducer";
import { ActionTypes } from "./todosReducer.types";

const initialTodos = [
    {
        title: "Третий тодо!",
        isCompleted: false,
        tasksTodo: [
            {
                title: "Тесттт",
                isCompleted: true
            },
        ]
    },
    {
        title: "ВТОРОЙ ТУДУ!",
        isCompleted: false,
        tasksTodo: [
            {
                title: "Привки",
                isCompleted: true
            },
            {
                title: "Потестисть",
                content: "течт",
                isCompleted: false
            }
        ]
    },
    {
        title: "Создайте ваш первый todo!",
        isCompleted: true,
        tasksTodo: [
            {
                title: "Запустить приложение",
                isCompleted: true
            },
            {
                title: "Потестисть фичи",
                content: "можно редактировать тудушки",
                isCompleted: true
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
