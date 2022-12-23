import { useEffect, useState } from "react";
import useSWR from "swr";
import { capitalizeAllWords, formatDateNumerical } from "../../utils/helpers";
import { ExerciseFromSWR } from "../tables/ExerciseTable";

interface Props {
    userId: number
    exerciseTId: number
}

interface PastExerciseProps {
    exercise: ExerciseFromSWR
}

function PastExercise({exercise}: PastExerciseProps){

    return exercise ? (
        <div className="flex pb-1 border-b-2 border-rose-300 last:border-none">
            <h2 className="w-28">{formatDateNumerical(exercise.createdAt)}</h2>
            <div className="flex space-x-2 flex-nowrap">
                {exercise.sets.map((set, i) => 
                    <div key={i} className="bg-violet-500 text-white rounded-full px-2 whitespace-nowrap">
                        {set.quantity ? `${set.quantity} x ${set.weight}` : `${set.weight} sec`}
                    </div>
                )}
            </div>
        </div>
    ) : null;
}

export default function ExerciseHistory({userId, exerciseTId}: Props){

    const {data: allUserExercises} = useSWR<ExerciseFromSWR[]>(`api/exercises/${userId}`);

    const [filteredExercises, setFilteredExercises] = useState<ExerciseFromSWR[]>([]);

    useEffect(()=>{
        if(!allUserExercises) return;
        setFilteredExercises(allUserExercises.filter(exercise => exercise.exerciseTId === exerciseTId));
    }, [allUserExercises, exerciseTId])

    useEffect(()=>{
        console.log(filteredExercises);
    }, [filteredExercises])

    if(filteredExercises.length < 1) return <div>Loading...</div>

    return (
        <div className="flex flex-col items-center space-y-2">
            <h2 className="font-bold w-full mb-2 text-sm sm:text-lg lg:text-xl border-b-2 border-violet-300">
                {capitalizeAllWords(filteredExercises[0].exerciseT.name)} History
            </h2>
            <div className="flex flex-col space-y-1 w-fit">
                <PastExercise exercise={filteredExercises[0]}/>
                <PastExercise exercise={filteredExercises[1]}/>
                <PastExercise exercise={filteredExercises[2]}/>
            </div>
        </div>
    );
}