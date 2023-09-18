import  { useState } from 'react'
import { IconIsCompleted } from '../../icons/iconIsCompleted'

export const TodoCardEditingAddTask = ({ cn, addTask }: { cn?: string, addTask: (todoTitle: string) => void }) => {
    const [newTodoTitle, setNewTodoTitle] = useState("")
    return (
        <div
            className={`w-full ${cn}`}
        >
            <IconIsCompleted
                cn='w-10 my-2 h-10 mx-auto hover:scale-110 transition-all cursor-pointer text-green-500'
                onClick={() => {
                    if (newTodoTitle.length > 0) {
                        addTask(newTodoTitle)
                        setNewTodoTitle("")
                    }
                }}
            />

            <input
                className='p-1 placeholder:text-slate-400 placeholder:font-extralight 
                           outline-none border-2 border-solid rounded-lg border-green-500 
                           text-left w-full text-xl '
                placeholder='Добавить задачу'
                value={newTodoTitle}
                onChange={(e) => { setNewTodoTitle(e.target.value) }}
            />
        </div>
    )
}
