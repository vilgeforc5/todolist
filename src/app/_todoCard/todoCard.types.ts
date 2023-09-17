import React from "react";
import { InsetCSS, TodoItem, WithClassName } from "../types";

export interface TodoCardProps extends WithClassName {
    todoItem : TodoItem;
    isActiveTodo: boolean;
    zIndex?: number;
    shouldMove: boolean;
    shift?: InsetCSS;
    editing : {
        isEditing: boolean;
        setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    }
}

