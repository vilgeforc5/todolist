import { ActionAddTasks, ActionAddTodo, ActionMoveToEnd, ActionRemoveTodo, ActionToggleTaskCompleted, TodoListReducer } from "./todosReducer.types";
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

export const toggleCompletion: ActionToggleTaskCompleted = ({taskTitle, todoTitle}) => {
    return {
        type: TodoActions.TOGGLE_TASK_COMPLETE,
        payload: {
            taskTitle,
            todoTitle
        }
    }

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

        case TodoActions.ADD_TODO_TASK: {

            return prevState.map(todoItem => {
                if (todoItem.title !== action.payload.id) return todoItem
                return {
                    title: todoItem.title,
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

        case TodoActions.TOGGLE_TASK_COMPLETE: {
            const {taskTitle, todoTitle} = action.payload
            return prevState.map(todo => {
                if (todo.title !== todoTitle) return todo
                return {
                    ...todo,
                    tasksTodo: todo.tasksTodo.map(task => {
                        if (task.title !== taskTitle) return task
                        console.log(123)

                        return ({
                            ...task,
                            isCompleted: !task.isCompleted
                        })
                    })
                }
            })
        }
    }
}

