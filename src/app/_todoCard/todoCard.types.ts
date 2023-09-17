import { InsetCSS, TodoItem, WithClassName } from "../types";

export interface TodoCardProps extends WithClassName {
    todoItem : TodoItem;
    isActiveTodo: boolean;
    zIndex?: number;
    shouldMove: boolean;
    shift?: InsetCSS;
}

