import { TodoCard } from "../_todoCard/todoCard"
import { TodosContainerProps } from "./todosContainer.types"

export const TodosContainer = ({todosList} : TodosContainerProps) => {
    return (
        <div className="relative h-[400px] w-full mt-8">
            {todosList.map((todo, index) => {
                return <TodoCard 
                            shouldMove={index === todosList.length-1 ? false : true}
                            cn={`absolute`} 
                            shift={{
                                top: index * 10,
                                left: index * 10
                            }}
                            isActiveTodo={index === todosList.length-1}
                            zIndex={index}
                            key={todo.title} 
                            todoItem={todo} 
                        />
            })}
        </div>
    )
}