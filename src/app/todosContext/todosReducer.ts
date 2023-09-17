import { ActionAddTasks, ActionAddTodo, ActionEditTodo, ActionMoveToEnd, ActionRemoveTodo, TodoListReducer } from "./todosReducer.types";
import { TodoActions } from "./todosReducer.types";

export const addTodo: ActionAddTodo = (todo) => {
    return {
        type: TodoActions.ADD_TODO,
        payload: todo
    }
}

export const removeTodo: ActionRemoveTodo = (id) => {
    return {
        type: TodoActions.REMOVE_TODO,
        payload: {
            id
        }
    }
}

export const editTodo: ActionEditTodo = (tasksTodo, id) => {
    return {
        type: TodoActions.EDIT_TODO,
        payload: {
            id,
            ...tasksTodo,
        }
    }
}

export const addTasks: ActionAddTasks = (addedTasks, id) => {
    return ({
        type: TodoActions.ADD_TODO_TASK,
        payload: {
            id,
            tasksToAdd: addedTasks
        }
    })
}

export const moveToEnd: ActionMoveToEnd = (id) => {
    return ({
        type: TodoActions.MOVE_TODO_TO_END,
        payload: {
            id
        }
    })
}

export const todosListReducer: TodoListReducer = (prevState, action) => {
    switch (action.type) {
        case TodoActions.ADD_TODO: {
            return [
                ...prevState.filter(todo => todo.title !== action.payload.title),
                action.payload
            ]
        }

        case TodoActions.REMOVE_TODO: {
            return [...prevState.filter(todo => todo.title !== action.payload.id)]
        }

        case TodoActions.EDIT_TODO: {
            return prevState.map(todo => {

                if (action.payload.id.trim().toLowerCase() !== todo.title.trim().toLowerCase())
                    return todo

                return {
                    // [object].hasOwnProperty leads to eslint error
                    title: Object.prototype.hasOwnProperty.call(action.payload, "title") ?
                        action.payload.title! :
                        todo.title,
                    isCompleted: Object.prototype.hasOwnProperty.call(action.payload, "isCompleted") ?
                        action.payload.isCompleted! :
                        todo.isCompleted,
                    tasksTodo: Object.prototype.hasOwnProperty.call(action.payload, "tasksTodo") ?
                        todo.tasksTodo.map(todoPiece => {
                            if (action.payload.tasksTodo) {
                                const editedPiece = action.payload.tasksTodo.find(item => item.title === todoPiece.title)

                                let isCompleted = todoPiece.isCompleted;
                                if (editedPiece && Object.prototype.hasOwnProperty.call(editedPiece, "isCompleted")) {
                                    isCompleted = editedPiece.isCompleted!
                                }
                                return {
                                    title: todoPiece.title,
                                    isCompleted:  isCompleted,
                                    content: editedPiece?.content || todoPiece.content
                                }
                            }
                            return todoPiece
                        })
                        : todo.tasksTodo
                }
            })
        }

        case TodoActions.ADD_TODO_TASK: {
            return prevState.map(todoItem => {
                if (todoItem.title !== action.payload.id) return todoItem
                return {
                    title: todoItem.title,
                    isCompleted: todoItem.isCompleted,
                    tasksTodo: [
                                // if task with same title(id)
                            ...todoItem.tasksTodo.filter(task => {
                                for (const item of action.payload.tasksToAdd) {
                                    if (item.title === task.title) return false
                                }
                                return true
                            })
                            , ...action.payload.tasksToAdd
                        ]
                }
            })
        }

        case TodoActions.MOVE_TODO_TO_END: {
            const indexTodo = prevState.findIndex(todo => todo.title === action.payload.id);
            if (indexTodo !== -1) {
                const element = prevState.splice(indexTodo, 1)[0];
                prevState.push(element);
              }
              return [...prevState];
        }
    }
}

