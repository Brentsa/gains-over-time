import { ExerciseTemplate } from "@prisma/client";
import { Dispatch, SetStateAction } from "react"

interface Props {
    children: JSX.Element,
    exercise: ExerciseTemplate
    setSelected: Dispatch<SetStateAction<ExerciseTemplate | undefined>>,
    setOpen: Dispatch<SetStateAction<boolean>>
    active: boolean
}

export default function DropdownItem({children, exercise, setSelected, setOpen, active}: Props){

    function handleClick(){
        setSelected(exercise);
        setOpen(false);
    }
    
    return (
        <li
            className={`px-2 py-1 ${active ? 'bg-rose-500 text-white' : 'hover:bg-rose-200'} `}
            value={exercise.id} 
            onClick={handleClick}
        >
            {children}
        </li>
    )
}