import { InsetCSS, TodoItem, WithClassName } from "../types";

export interface CardTodoProps extends WithClassName {
    data: TodoItem;
    isActive: boolean;
    moving?: {
        moveDirection: "top" | "left" | "right" | "bottom";
        shouldMove: boolean;
    }
    zIndex?: number;
    shift?: InsetCSS;
}