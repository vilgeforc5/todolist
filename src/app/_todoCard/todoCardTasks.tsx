import { ReactNode } from "react";
import { TodoItem } from "../types"

interface TodoCardTasksProps {
    tasks: TodoItem["tasksTodo"];
    renderTitle: (title: string) => ReactNode;
    onCompleteClick: (taskTitle: string) => void;
    // renderContent: (content?: string) => ReactNode;
}

export const TodoCardTasks = ({ tasks, renderTitle, onCompleteClick }: TodoCardTasksProps) => {
    return (
        <ul className="flex flex-col gap-y-3 p-1.5">
            {tasks.map(todo => {
                return (
                    <li
                        key={todo.title}
                        className="bg-zinc-100 p-1 flex justify-start items-center gap-x-4 px-2"
                    >
                        <div>
                            <svg 
                                onClick={() => {onCompleteClick(todo.title)}}
                                className={`${todo.isCompleted ? "text-green-500 hover:text-green-400" : "text-slate-500 hover:text-slate-400"} w-6 h-6 cursor-pointer`}
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <div>
                            <p
                                className={`${todo.isCompleted ? "line-through text-slate-800" : "text-slate-950"} 
                                            text-2xl font-light`}
                            >
                                {renderTitle(todo.title)}
                            </p>
                            <p className={`${todo.isCompleted ? "line-through text-slate-800" : "text-slate-950"} 
                                            text-xl pl-2 font-light`}
                            >
                                {(todo.content)}
                            </p>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}