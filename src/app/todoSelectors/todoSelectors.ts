import { TodoList } from "../types"

export const selectCompleted = (todoList: TodoList)  => {
    return todoList.filter(todo => todo.tasksTodo.every(task => task.isCompleted))
}

export const selectNonCompleted = (todoList: TodoList)  => {
    return todoList.filter(todo => todo.tasksTodo.some(task => !task.isCompleted))
}
