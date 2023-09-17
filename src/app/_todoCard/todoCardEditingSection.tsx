export const TodoCardEditingSection = ({ cn, stopEditing, commitEditing }: { cn?: string, stopEditing: () => void, commitEditing: () => void }) => {
    return (
        <div className={`${cn} flex gap-x-3`}>
            <div
                onClick={() => { commitEditing(); stopEditing() }}
                className="p-1 px-2 bg-zinc-200 flex justify-center items-center gap-x-1.5 cursor-pointer group/svg"
            >
                <svg
                    className="w-6 h-6 inline-block text-green-500 group-hover/svg:rotate-180 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg font-light">
                    Внести изменения
                </span>
            </div>
            <div
                className="p-1 px-2 bg-zinc-200 flex justify-center items-center gap-x-1.5 cursor-pointer group/svg"
                onClick={() => { stopEditing() }}
            >
                <svg
                    className="w-6 h-6 inline-block text-red-500 group-hover/svg:rotate-180 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg font-light">
                    Отменить изменения
                </span>
            </div>

        </div>
    )
}