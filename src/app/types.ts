interface TodoItemPiece {
    title: string;
    content?: string;
    isCompleted: boolean;
}


export interface  TodoItem  {
    title: string;
    tasksTodo: Array<TodoItemPiece>;
} 

export type TodoList = Array<TodoItem>


export type TodoItemWithPartialActions = {
    [K in keyof TodoItem]: K extends "tasksTodo"
      ? Array<Partial<TodoItemPiece>>
      : TodoItem[K];
  };

export interface InsetCSS {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}
export interface WithClassName {
    cn?: string;
}
  
export type ArrayElement<ArrayType extends readonly unknown[]> = 
ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
