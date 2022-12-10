import { useEffect, useState } from "react";
import useSWR from "swr";
import { ExerciseFromSWR } from "../tables/ExerciseTable";

interface Props {
    userId: number
    exerciseTId: number
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

    return (
        <div>
            Hello There Friend
        </div>
    );
}