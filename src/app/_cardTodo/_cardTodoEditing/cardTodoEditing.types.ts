import { editTodo } from "../../todosContext/todosReducer";
import { TodoItem, WithClassName } from "../../types";

export interface CardTodoEditingProps extends WithClassName {
    todo: TodoItem;
    isActive: boolean;
    setActive: () => void;
    onUndo: () => void;
    onApply: (todoChanges: Parameters<typeof editTodo>[0], tasksToAdd: TodoItem["tasksTodo"], tasksToDelete: string[]) => void;
}