import { useEffect, useState } from "react";
import useSWR from "swr";
import { formatDateNumerical } from "../../utils/helpers";
import { ExerciseFromSWR } from "../tables/ExerciseTable";
import SetPill from "./SetPill";

interface Props {
    userId: number
    exerciseTId: number
}

interface PastExerciseProps {
    exercise: ExerciseFromSWR
}

function PastExercise({exercise}: PastExerciseProps){

    return exercise ? (
        <div className="flex space-x-4">
            <h2>{formatDateNumerical(exercise.createdAt)}</h2>
            <div className="flex space-x-2 flex-nowrap">
                {exercise.sets.map((set, i) => 
                    <div key={i}>
                        {set.quantity} x {set.weight}
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
        <div>
            <div>
                <h2>Latest Exercises</h2>
                <div className="flex flex-col">
                    <PastExercise exercise={filteredExercises[0]}/>
                    <PastExercise exercise={filteredExercises[1]}/>
                    <PastExercise exercise={filteredExercises[2]}/>
                </div>
            </div>
        </div>
    );
}