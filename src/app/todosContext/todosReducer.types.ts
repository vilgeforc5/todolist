import { TodoItem, TodoList } from "../types";

export enum TodoActions {
    ADD_TODO="ADD_TODO",
    REMOVE_TODO="REMOVE_TODO",
    ADD_TODO_TASK="ADD_TODO_TASK",
    MOVE_TODO_TO_END="MOVE_TODO_TO_END",
    TOGGLE_TASK_COMPLETE="TOGGLE_TASK_COMPLETE"
}

interface PayloadAction<T extends keyof typeof TodoActions, P> {
    type: T,
    payload: P
}

interface AddTodoPayload extends TodoItem {}

interface RemoveTodoPayload {
    id: string;
}
  
// type EditTodoPayload = Partial<TodoItemWithPartialActions> & {id: string};

interface AddTasksPayload {
    tasksToAdd: TodoItem["tasksTodo"];
    id: string;
} 

interface SetTaskCompletedPayload {
    todoTitle: string;
    taskTitle: string;
}

export interface ActionAddTodo {
    (todo: TodoItem) : PayloadAction<TodoActions.ADD_TODO , AddTodoPayload>
}

export interface ActionRemoveTodo {
    (id: string) : PayloadAction<TodoActions.REMOVE_TODO, RemoveTodoPayload>
}

export interface ActionMoveToEnd {
    (id: string) : PayloadAction<TodoActions.MOVE_TODO_TO_END, {id: string}>
}

export interface ActionAddTasks {
    (addedTasks: TodoItem["tasksTodo"], id:string) : PayloadAction<TodoActions.ADD_TODO_TASK, AddTasksPayload>
}

export interface ActionToggleTaskCompleted {
    ({todoTitle, taskTitle} : SetTaskCompletedPayload) : PayloadAction<TodoActions.TOGGLE_TASK_COMPLETE, SetTaskCompletedPayload>

}


export type ActionTypes = 
    | ReturnType<ActionAddTodo>
    | ReturnType<ActionRemoveTodo>
    | ReturnType<ActionAddTasks>
    | ReturnType<ActionMoveToEnd>
    | ReturnType<ActionToggleTaskCompleted>

export interface TodoListReducer {
    (prevState: TodoList, action: ActionTypes) : TodoList;
}