import { ExerciseTemplate, Set } from "@prisma/client";
import { formatDateFullString } from "../../utils/helpers";
import { ExerciseFromSWR } from "./ExerciseTable";

interface Props {
    exercise: ExerciseFromSWR
}

export default function ExerciseTableRow({exercise}: Props){

    return (
        <li className="w-full grid grid-cols-10 border-b-2 first:border-t-2 border-violet-300 py-1">
            <div className="flex flex-col col-span-3 md:col-span-2">
                <div className="font-semibold text-lg">{exercise.exerciseT.name}</div>
                <div className="text-sm">{formatDateFullString(exercise.createdAt)}</div>
            </div>
            <div className="col-span-7 md:col-span-8 bg-gray-200 hover:bg-gray-100">

            </div>
        </li>
    )
}