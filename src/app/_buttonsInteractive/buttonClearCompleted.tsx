import { useTodosData, useTodosDispatch } from "../todosContext/todosHooksContext"
import { removeTodos } from "../todosContext/todosReducer"

export const ButtonClearCompleted = ({cn} : {cn?: string}) => {
    const { dispatchTodos } = useTodosDispatch()
    const todos = useTodosData()

    const clearCompleted = () => {
        dispatchTodos(removeTodos(todos.filter(item => {
                    const notCompletedTask = item.tasksTodo.findIndex(task => task.isCompleted === false)
                    if (notCompletedTask !== -1) return false
                    return true
                })
                .map(todo => todo.title)
        ))
    }

    return (
        <button 
            className={`${cn}`}
            onClick={() => {clearCompleted()}}
        >
            Очистить законченные
        </button>

    )
}