import { useState } from "react"
import { AddTodoModal } from "../_addTodoModal/addTodoModal"

export const ButtonAddTodo = ({cn} : {cn?: string}) => {
    const [modalAddTodoOpen, setModalAddTodoOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => {
                    setModalAddTodoOpen(true)
                }}
                className={`${cn}`}
            >
                <p>
                    Добавить todo
                </p>
            </button>
            <div className="hidden">
                <AddTodoModal
                    isOpen={modalAddTodoOpen}
                    closeModal={() => {
                        setModalAddTodoOpen(false)
                    }}
                />
            </div>


        </>
    )
}