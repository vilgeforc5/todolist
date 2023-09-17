
interface TodoActionBarProps {
    cn?: string;
    selectActive: () => void;
    isCompleted: boolean; 
    isActiveTodo: boolean;
    setIsEditing: () => void

}

/**
 * 
 * @param cn just styles
 * @param isCompleted additional styling if Todo is completed
 * @param isActiveTodo restricts editing and other stuff if Todo isn't active ( active - the first on the stack)
 * @param selectActive triggers bookmark button to choose Todo, other than active ( from stack)
 * @param setIsEditing triggers editing button to edit current Todo (restricted by isActiveTodo if in stack)
 * @returns 
 */
export const TodoActionBar = ({ cn, isCompleted, isActiveTodo, selectActive, setIsEditing }: TodoActionBarProps) => {
    return (
        <div className={`${cn} w-full flex items-center justify-start gap-x-1 `}>
            {/* bookmark */}
            <button
                disabled={isActiveTodo}
                onClick={() => {
                    selectActive()
                }}
            >
                <svg
                    className={`${isActiveTodo ? "text-orange-500 cursor-default" :
                               "text-blue-950 hover:text-orange-500 cursor-pointer"}
                                w-6 h-6 lg:w-7 lg:h-7`}
                    fill={`${isActiveTodo ? "rgb(249, 115, 22)" : "none"}`}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
            </button>
            {/* edit */}
            <button
                disabled={!isActiveTodo}
                onClick={() => {
                    setIsEditing()
                }}
            >
                <svg className={`${!isActiveTodo ? "cursor-not-allowed" : "cursor-pointer hover:text-slate-700"}
                                w-6 h-6 lg:w-7 lg:h-7 text-slate-950 `} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>
            {/* is completed */}
            <button className={`ml-auto`}>
                <svg
                    className={`${isCompleted ? "text-green-500" : "text-slate-500"}
                                w-6 h-6 lg:w-7 lg:h-7 cursor-default
                               `}
                    fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    )
}