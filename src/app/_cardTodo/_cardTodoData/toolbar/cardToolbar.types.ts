import { WithClassName } from "../../../types";

export interface CardToolbarProps extends WithClassName {
    isActive: boolean;
    isCompleted: boolean;
    setEditing: () => void;
    setActive: () => void;
}