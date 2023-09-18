import { ReactNode } from "react";
import { ArrayElement, TodoItem, WithClassName } from "../../../types";

export interface CardTasksProps extends WithClassName {
    tasks: TodoItem["tasksTodo"];
    renderTitle: (todo: ArrayElement<TodoItem["tasksTodo"]>) => ReactNode;
    onCompleteClick: (taskTitle: string) => void;
    renderIcon: (todo: ArrayElement<TodoItem["tasksTodo"]>) => ReactNode;
    taskClassname: string;
}