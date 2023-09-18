import { TodoListModeContextWrapper } from './_todoListModes/todoTodoListModesContext'
import { Todos } from './_todos/todos'
import { TodosContext } from './todosContext/todosContext'

export const App = () => {
  return (
    <TodoListModeContextWrapper>
      <TodosContext>
        <main className="flex h-full flex-col lg:flex-row">
          <section className="basis-full flex-1 grid place-items-center">
            <Todos />
          </section>
        </main>
      </TodosContext>
    </TodoListModeContextWrapper>
  )
}

