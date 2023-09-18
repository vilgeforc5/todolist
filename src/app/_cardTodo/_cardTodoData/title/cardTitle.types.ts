import { ReactNode } from "react";
import { WithClassName } from "../../../types";

export interface CardTitleProps extends WithClassName {
    isCompleted: boolean;
    title: ReactNode;
}