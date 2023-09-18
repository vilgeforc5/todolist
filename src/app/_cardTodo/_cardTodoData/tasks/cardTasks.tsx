import { ReactNode, useRef } from "react";
import { ArrayElement, TodoItem, WithClassName } from "../../../types";


interface CardTasksProps <T extends ArrayElement<TodoItem["tasksTodo"]>> extends WithClassName {
    tasks: T[];
    renderTitle: (todo: T) => ReactNode;
    renderIcon: (todo: T) => ReactNode;
    onCompleteClick: (todo: T) => void;
    taskClassname: string;
} 

export const CardTasks = <T extends ArrayElement<TodoItem["tasksTodo"]>>
        ({ cn, tasks, renderTitle, onCompleteClick, renderIcon, taskClassname }: CardTasksProps<T>) => {
    
    const ulRef = useRef<HTMLUListElement>(null)
    return (
        <ul ref={ulRef} className={`${cn} flex flex-col gap-y-3 `}>
            {tasks.map((todo, i) => {
                return (
                    <li
                        key={i}
                        className={`${taskClassname}  p-1 flex justify-start items-center gap-x-4 px-2`}
                    >
                        <div onClick={() => { 
                                onCompleteClick(todo) 
                            }}>
                            {renderIcon(todo)}
                        </div>
                        <div className="flex-1">
                            {renderTitle(todo)}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}