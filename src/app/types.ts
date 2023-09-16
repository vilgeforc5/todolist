interface TodoItemPiece {
    title: string;
    content?: string;
    isCompleted: boolean;
}


export interface  TodoItem  {
    title: string;
    tasksTodo: Array<TodoItemPiece>;
    isCompleted: boolean;
} 

export type TodoList = Array<TodoItem>


export type TodoItemWithPartialActions = {
    [K in keyof TodoItem]: K extends "tasksTodo"
      ? Array<Partial<TodoItemPiece>>
      : TodoItem[K];
  };
  
