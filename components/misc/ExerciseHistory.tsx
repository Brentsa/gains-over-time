import { useEffect, useState } from "react";
import useSWR from "swr";
import { capitalizeAllWords, formatDateNumerical } from "../../utils/helpers";
import { ExerciseFromSWR } from "../tables/ExerciseTable";
import { RepType } from "@prisma/client";
import ExerciseChart from "./ExerciseChart";

export type GraphType = 'weight' | 'reps' | 'both'

interface Props {
    userId: number
    exerciseTId: number
    exerciseType: RepType
};

interface PastExerciseProps {
    exercise: ExerciseFromSWR
};

function PastExercise({exercise}: PastExerciseProps){
    return exercise ? (
        <div className="flex flex-col sm:flex-row pb-1 border-b-2 border-rose-300 last:border-none">
            <h2 className="w-28">{formatDateNumerical(exercise.createdAt)}</h2>
            <div className="flex space-x-1 sm:space-x-2 overflow-scroll">
                {exercise.sets.map((set, i) => 
                    <div key={i} className="bg-violet-500 text-white rounded-full px-2 whitespace-nowrap">
                        {set.quantity ? `${set.quantity} x ${set.weight}` : `${set.weight} sec`}
                    </div>
                )}
            </div>
        </div>
    ) : null;
}

export default function ExerciseHistory({userId, exerciseTId, exerciseType}: Props){

    const {data: allUserExercises} = useSWR<ExerciseFromSWR[]>(`api/exercises/${userId}`);

    const [filteredExercises, setFilteredExercises] = useState<ExerciseFromSWR[]>([]);
    const [graphState, setGraphState] = useState<GraphType>('weight');

    useEffect(()=>{
        if(!allUserExercises) return;

        //set the filtered exercise array with all of the user's exercises with the supplied exercise template ID
        setFilteredExercises(allUserExercises.filter(exercise => exercise.exerciseTId === exerciseTId));
    }, [allUserExercises, exerciseTId]);

    //if there is no filtered data then do not display the exercise history
    if(filteredExercises.length < 1) return <div>Loading...</div>
    
    return (
        <div className="flex flex-col items-center space-y-4 w-screen">
            <h2 className="font-bold w-full mb-2 text-sm sm:text-lg lg:text-xl border-b-2 border-violet-300">
                {capitalizeAllWords(filteredExercises[0].exerciseT.name)} History
            </h2>
            <div className="flex flex-col space-y-1 w-full">
                <PastExercise exercise={filteredExercises[0]}/>
                <PastExercise exercise={filteredExercises[1]}/>
                <PastExercise exercise={filteredExercises[2]}/>
            </div>

            {filteredExercises.length > 1 && 
                <div className="w-full">
                    {exerciseType === 'lbs' &&
                        <div className="flex w-full justify-around">
                            <button onClick={() => setGraphState('weight')}>Weight</button>
                            <button onClick={() => setGraphState('reps')}>Reps</button>
                            <button onClick={() => setGraphState('both')}>Both</button>
                        </div>
                    }
                    <ExerciseChart exercises={filteredExercises} show={graphState}/>
                </div>
            }
        </div>
    );
}