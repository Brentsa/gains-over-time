import { ExerciseTemplate, Set } from "@prisma/client";
import { formatDateFullString } from "../../utils/helpers";
import { ExerciseFromSWR } from "./ExerciseTable";

interface Props {
    exercise: ExerciseFromSWR
}

export default function ExerciseTableRow({exercise}: Props){

    console.log(exercise.createdAt);

    return (
        <li className="w-full border-b-2 first:border-t-2 border-violet-300">
            <div className="flex flex-col">
                <div>{exercise.exerciseT.name}</div>
                <div className="text-sm">{formatDateFullString(exercise.createdAt)}</div>
            </div>
        </li>
    )
}