import { ButtonsInteractive } from "../_buttonsInteractive/buttonInteractive"
import { TodosContainer } from "../_todosContainer/todosContainer"
import { useTodosData } from "../todosContext/todosHooksContext"
import { useTodoListModeContext } from "../_todoListModes/todoTodoListModesContext"
import { selectCompleted, selectNonCompleted } from "../todoSelectors/todoSelectors"

export const Todos = () => {
    const todosList = useTodosData()

    let todoListWithMode: typeof todosList;
    const {mode} = useTodoListModeContext()

    if (mode === "all") {
        todoListWithMode = todosList
    } else if (mode === "completed") {
        todoListWithMode = selectCompleted(todosList)
    } else {
        todoListWithMode = selectNonCompleted(todosList)
    }

    return (
        <div className="h-full w-full flex justify-center items-center relative">
            <div className="flex  flex-col items-center w-4/5 md:w-3/5 lg:w-1/2 ">
                <TodoTitle />
                <TodosContainer todosList={todoListWithMode}/>
            </div>
            <ButtonsInteractive 
                cn="absolute top-0"
            />
        </div>
    )
}

const TodoTitle = () => {
    return (
        <h1 className="text-5xl lg:text-6xl font-bold font-mono tracking-wide bg-blue-700 p-2 text-slate-200 group">
            Todo<i className="text-orange-500 group-hover:text-orange-600 transition-all">.</i>List
        </h1>
    )
}

