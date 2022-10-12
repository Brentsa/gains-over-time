import { ExerciseTemplate, Set } from "@prisma/client";
import { ExerciseFromSWR } from "./ExerciseTable";

interface Props {
    exercise: ExerciseFromSWR
}

export default function ExerciseTableRow({exercise}: Props){

    console.log(exercise.createdAt);

    return (
        <div className="w-full border-b-2 border-violet-300">
            <div className="flex flex-col">
                <div>{exercise.exerciseT.name}</div>
                <div className="text-sm">{exercise.createdAt}</div>
            </div>
            
        </div>
    )
}