import { ReactNode } from "react";
import { ArrayElement, TodoItem } from "../types"

interface TodoCardTasksProps {
    tasks: TodoItem["tasksTodo"];
    renderTitle: (todo: ArrayElement<TodoItem["tasksTodo"]>) => ReactNode;
    onCompleteClick: (taskTitle: string) => void;
    renderIcon: (todo: ArrayElement<TodoItem["tasksTodo"]>) => ReactNode;
    taskClassname: string;
}

export const TodoCardTasks = ({ tasks, renderTitle, onCompleteClick, renderIcon, taskClassname }: TodoCardTasksProps) => {
    return (
        <ul className="flex flex-col gap-y-3 ">
            {tasks.map(todo => {
                return (
                    <li
                        key={todo.title}
                        className={`${taskClassname}  bg-zinc-100 p-1 flex justify-start items-center gap-x-4 px-2`}
                    >
                        <div onClick={() => { onCompleteClick(todo.title) }}>
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