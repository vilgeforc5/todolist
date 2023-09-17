import { TodoList, WithClassName } from "../types";

export interface TodosContainerProps extends WithClassName {
    todosList: TodoList;
}