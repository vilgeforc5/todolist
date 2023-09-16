import { useContext } from "react"
import { TodosDataContext, TodosDispatchContext } from "./todosContext"

export const useTodosData = () => {
    const todosData = useContext(TodosDataContext)

    if (todosData === undefined) throw new Error ("should be inside wrapper")

    return todosData
}

export const useTodosDispatch = () => {
    const todosDispatch = useContext(TodosDispatchContext)

    if (todosDispatch === undefined) throw new Error ("should be inside wrapper")

    return todosDispatch

}