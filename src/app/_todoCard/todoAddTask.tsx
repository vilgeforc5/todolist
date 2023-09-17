import React, { useState } from 'react'

export const TodoAddTask = ({cn, addTodo}: {cn?: string, addTodo: (todoTitle: string) => void}) => {
    const [newTodoTitle, setNewTodoTitle] = useState("")
    return (
        <div 
            className={`w-full ${cn}`}
        >
            <svg 
                onClick={() => {
                    if(newTodoTitle.length > 0){
                        addTodo(newTodoTitle)
                        setNewTodoTitle("")
                    }
                }}
                className="w-10 my-2 h-10 mx-auto hover:scale-110 transition-all cursor-pointer text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <input 
                className='p-1 outline-none border-2 border-dotted border-green-700 text-left w-full text-xl'
                value={newTodoTitle}
                onChange={(e) => {setNewTodoTitle(e.target.value)}}
            />
        </div>
    )
}
