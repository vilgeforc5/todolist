import { TodosContainer } from "../_todosContainer/todosContainer"
import { useTodosData } from "../todosContext/todosHooksContext"

export const Todos = () => {
    const todos = useTodosData()

    return (
        <div className="h-full w-full grid place-items-center	">
            <div className="flex flex-col items-center w-[500px] ">
                <TodoTitle />
                <TodosContainer todosList = {todos} />
            </div>
        </div>
    )
}

const TodoTitle = () => {
    return (
        <h1 className="text-6xl font-bold font-mono tracking-wide bg-blue-700 p-2 text-slate-200 group">
            Todo<i className="text-orange-500 group-hover:text-orange-600 transition-all">.</i>List
        </h1>
    )
}