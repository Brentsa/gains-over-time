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
            <div className="flex flex-col col-span-10 md:col-span-3 lg:col-span-2 pb-2 sm:pb-0 order-1">
                <div className="font-semibold text-lg">{exercise.exerciseT.name}</div>
                <div className="text-sm">{formatDateFullString(exercise.createdAt)}</div>
            </div>
            <div className="col-span-full md:col-span-8 lg:col-span-9 bg-gray-200 hover:bg-gray-100 rounded h-14 sm:h-full order-3 sm:order-2" onClick={addSet}>

            </div>
            <div className="col-span-2 md:col-span-1 flex justify-center items-center order-2 sm:order-3">
                <IconButton icon={faTrash}/>
            </div>
        </li>
    )
}