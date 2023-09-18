import { ButtonAddTodo } from "./buttonAddTodo"
import { ButtonClearCompleted } from "./buttonClearCompleted"
import { ButtonsSetMode } from "./buttonsSetMode"

const defaultButtonCn="text-md md:text-lg text-white rounded-lg bg-orange-600  p-1 md:p-1.5 shadow-md shadow-orange-900"

export const ButtonsInteractive = ({ cn }: { cn?: string}) => {


    return (
        <div className={`${cn} flex flex-wrap gap-y-1.5 justify-start w-full p-1.5   lg:p-2 gap-x-1.5 border-2`}>
            <ButtonAddTodo cn={defaultButtonCn}/>
            <ButtonClearCompleted 
                cn={defaultButtonCn} 
            />
            <ButtonsSetMode  />
        </div>
    )
}