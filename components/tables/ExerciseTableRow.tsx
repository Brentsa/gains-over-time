import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { MouseEvent } from "react";
import { formatDateFullString } from "../../utils/helpers";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import { ExerciseFromSWR } from "./ExerciseTable";

interface Props {
    exercise: ExerciseFromSWR
}

export default function ExerciseTableRow({exercise}: Props){

    function addSet(event: MouseEvent<HTMLDivElement>){
        event.preventDefault();
        console.log('clicked')
    }

    return (
        <li className="w-full grid grid-cols-12 border-b-2 first:border-t-2 border-violet-300 py-1">
            <div className="flex flex-col col-span-4 md:col-span-3 lg:col-span-2">
                <div className="font-semibold text-lg">{exercise.exerciseT.name}</div>
                <div className="text-sm">{formatDateFullString(exercise.createdAt)}</div>
            </div>
            <div className="col-span-7 md:col-span-8 lg:col-span-9 bg-gray-200 hover:bg-gray-100 rounded" onClick={addSet}>

            </div>
            <div className="col-span-1 flex justify-center items-center">
                <IconButton icon={faTrash}/>
            </div>
        </li>
    )
}