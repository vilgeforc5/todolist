import Modal from 'react-modal';
import { CardTodoEditing } from '../_cardTodo/_cardTodoEditing/cardTodoEditing';
import { useTodosDispatch } from '../todosContext/todosHooksContext';
import { addTodo } from '../todosContext/todosReducer';
import { useViewportWidth } from '../hooks/useViewportWidth';


Modal.setAppElement('#root');

export const AddTodoModal = ({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) => {
    const { dispatchTodos } = useTodosDispatch()
    const defaultTodo = {
        title: "Название",
        tasksTodo: [
            {
                title: "Задача 1",
                isCompleted: false
            }
        ]
    }

    const {width} = useViewportWidth()
    let sizeModal: string;
    if (width < 768) {
        sizeModal = "80%"
    } else if (width < 1024) {
        sizeModal = "60%"
    } else {
        sizeModal = "50%"
    }


    return (
        <div>
            <Modal
                isOpen={isOpen}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        width: sizeModal,
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: "rgb(248, 250, 252)",
                        
                    },
                    overlay: { zIndex: 1000 },
                }}
                contentLabel="Example Modal"
                preventScroll={true}
                onRequestClose={closeModal}
            >
                <CardTodoEditing
                    cn="h-[350px] lg:h-[400px] w-full bg-slate-50 overflow-y-scroll"
                    todo={defaultTodo}
                    isActive={true}
                    setActive={() => { }}
                    onUndo={() => { closeModal() }}
                    onApply={(todoChanges) => {
                        const addedTodo: Parameters<typeof addTodo>[0] = {
                            title: todoChanges.newTitle || todoChanges.prevTodoTitle,
                            tasksTodo: todoChanges.tasksTodo ?
                                todoChanges.tasksTodo.map(task => ({
                                    isCompleted: task.isCompleted,
                                    title: task.newTitle || task.title
                                })) :
                                []
                        }
                        dispatchTodos(addTodo(addedTodo))
                        closeModal()
                    }}
                />

            </Modal>
        </div>
    );
}

