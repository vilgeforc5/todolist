import { TodoItem, TodoItemWithPartialActions, TodoList } from "../types";

export enum TodoActions {
    ADD_TODO="ADD_TODO",
    REMOVE_TODO="REMOVE_TODO",
    EDIT_TODO="EDIT_TODO",
    ADD_TODO_TASK="ADD_TODO_TASK"
}

interface PayloadAction<T extends keyof typeof TodoActions, P> {
    type: T,
    payload: P
}

interface AddTodoPayload extends TodoItem {}

interface RemoveTodoPayload {
    id: string;
}
  
type EditTodoPayload = Partial<TodoItemWithPartialActions> & {id: string};

interface AddTasksPayload {
    tasksToAdd: TodoItem["tasksTodo"];
    id: string;
} 


export interface ActionAddTodo {
    (todo: TodoItem) : PayloadAction<TodoActions.ADD_TODO , AddTodoPayload>
}

export interface ActionRemoveTodo {
    (id: string) : PayloadAction<TodoActions.REMOVE_TODO, RemoveTodoPayload>
}

export interface ActionEditTodo {
    (todoChanges: Partial<TodoItemWithPartialActions>, id: string) : PayloadAction<TodoActions.EDIT_TODO, EditTodoPayload>
}

export interface ActionAddTasks {
    (addedTasks: TodoItem["tasksTodo"], id:string) : PayloadAction<TodoActions.ADD_TODO_TASK, AddTasksPayload>
}

export type ActionTypes = 
    | ReturnType<ActionAddTodo>
    | ReturnType<ActionRemoveTodo>
    | ReturnType<ActionEditTodo>
    | ReturnType<ActionAddTasks>

export interface TodoListReducer {
    (prevState: TodoList, action: ActionTypes) : TodoList;
}