// import { TodoCard } from "../_todoCard/todoCard"
import { useViewportWidth } from "../hooks/useViewportWidth"
import { CardTodo } from "../_cardTodo/cardTodo"
import { TodoList } from "../types";

export const TodosContainer = ({todosList}:{todosList: TodoList}) => {
    const { width } = useViewportWidth()
    const shiftBasis = width < 768 ? 15 : 10;
    return (
        <div className="relative h-[350px] lg:h-[400px] w-full mt-8 drop-shadow-xl">
            {todosList.length >= 1 ? 
                todosList.map((todo, index) => {
                return <CardTodo
                    moving={{
                        shouldMove: index !== todosList.length - 1,
                        moveDirection: width < 768 ? "top" : "left"
                    }}
                    cn={`absolute`}
                    shift={{
                        right: width > 768 ? shiftBasis * (todosList.length - 1 - index) : undefined,
                        top: shiftBasis * (todosList.length - 1 - index)
                    }}
                    isActive={index === todosList.length - 1}
                    zIndex={index}
                    key={todo.title}
                    data={todo}
                />
                })
                :
                <div className="w-full h-full grid place-items-center bg-slate-50 rounded-lg">
                    <p className="text-slate-950 text-5xl [text-shadow:_0_2px_0_#7f5ef8]"> 
                        Здесь мог быть ваш TODO 
                    </p>
                </div>
            }
        </div>
    )
}