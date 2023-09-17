import { Todos } from './_todos/todos'
import { TodosAside } from './todosAside/todosAside'
import { TodosContext } from './todosContext/todosContext'
export const App = () => {
  return (
    <TodosContext>
      <main className="flex h-full  lg:flex-row">
        <section className="basis-4/5">
          <Todos />
        </section>
        <aside className="basis-1/5">
          <TodosAside />
        </aside>
      </main>
    </TodosContext>
  )
}
