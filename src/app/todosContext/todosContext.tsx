import { ReactNode, createContext, useReducer } from "react";
import { TodoList } from "../types";
import { todosListReducer } from "./todosReducer";
import { ActionTypes } from "./todosReducer.types";

const initialTodos: TodoList = [
  {
    title: "Создайте ваш первый todo!",
    isCompleted: false,
    tasksTodo: [
        {
            title: "Запустить приложение",
            isCompleted: true            
        },
        {
            title: "Потестисть фичи",
            content: "можно редактировать тудушки",
            isCompleted: false
        }
    ]
  },
];

export const TodosDataContext = createContext (initialTodos)
export const TodosDispatchContext = createContext <{dispatchTodos: React.Dispatch<ActionTypes>}>
    ({dispatchTodos: () => null})

export const TodosContext = ({children} : {children: ReactNode}) => {
    const [todosList, dispatchTodos] = useReducer(todosListReducer, initialTodos)

    return (
        <TodosDataContext.Provider value={todosList}>
            <TodosDispatchContext.Provider value = {{dispatchTodos}}>
                {children}
            </TodosDispatchContext.Provider>
        </TodosDataContext.Provider>
    )
}
