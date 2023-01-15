import { useEffect, useState } from "react";
import useSWR from "swr";
import { capitalizeAllWords, formatDateShortMonth } from "../../utils/helpers";
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
        <div className="flex flex-col">
            <h2 className="text-xs pl-4 border-b-2 border-rose-500">{formatDateShortMonth(exercise.createdAt)}</h2>
            <div className="flex p-1 space-x-1 sm:space-x-2 overflow-scroll bg-gray-300 shadow-inner rounded-b">
                {exercise.sets.length > 0 ?
                    exercise.sets.map((set, i) => 
                        <div key={i} className="bg-violet-500 text-white rounded-full px-2 whitespace-nowrap">
                            {set.quantity + ' '}
                            {exercise.exerciseT.type === 'lbs' ?
                                <><span className="text-xs">x</span> {set.weight}<span className="text-xs">lbs</span></>
                                :
                                <span className="text-xs">{exercise.exerciseT.type === 'seconds' ? 'sec' : 'reps'}</span>
                            }
                        </div>)
                    :
                    <div className="h-5"/>
                }
            </div>
        </div>
    ) : null;
}

export default function ExerciseHistory({userId, exerciseTId, exerciseType}: Props){

    const {data: allUserExercises} = useSWR<ExerciseFromSWR[]>(`api/exercises/${userId}`);

    const [filteredExercises, setFilteredExercises] = useState<ExerciseFromSWR[]>([]);
    const [graphState, setGraphState] = useState<GraphType>(exerciseType === 'lbs' ? 'weight' : 'reps');

    useEffect(()=>{
        if(!allUserExercises) return;

        //set the filtered exercise array with all of the user's exercises with the supplied exercise template ID
        setFilteredExercises(allUserExercises.filter(exercise => exercise.exerciseTId === exerciseTId));
    }, [allUserExercises, exerciseTId]);

    //if there is no filtered data then do not display the exercise history
    if(filteredExercises.length < 1) return <div>Loading...</div>

    console.log(filteredExercises);
    
    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="font-bold w-full mb-3 pr-6 sm:text-lg lg:text-xl border-b-4 border-violet-400">
                {capitalizeAllWords(filteredExercises[0].exerciseT.name)} History
            </h2>
            <div className="flex flex-col space-y-2 w-full">
                <PastExercise exercise={filteredExercises[0]}/>
                <PastExercise exercise={filteredExercises[1]}/>
                <PastExercise exercise={filteredExercises[2]}/>
            </div>

            {filteredExercises.length > 1 && filteredExercises.slice().reverse()[1].sets.length > 0 &&
                <div className="w-full mt-6">
                    {exerciseType === 'lbs' &&
                        <div className="flex w-full justify-center space-x-4">
                            <button 
                                onClick={() => setGraphState('weight')} 
                                className={`rounded p-1 w-24 ${graphState === 'weight' ? 'bg-rose-500 text-white' : 'text-gray-700 border-2 border-rose-500 hover:bg-gray-100'}`}
                            >
                                Weight
                            </button>
                            <button 
                                onClick={() => setGraphState('reps')}
                                className={`rounded p-1 w-24 ${graphState === 'reps' ? 'bg-rose-500 text-white' : 'text-gray-700 border-2 border-rose-500 hover:bg-gray-100'}`}
                            >
                                Reps
                            </button>
                            <button 
                                onClick={() => setGraphState('both')}
                                className={`rounded p-1 w-24 ${graphState === 'both' ? 'bg-rose-500 text-white' : 'text-gray-700 border-2 border-rose-500 hover:bg-gray-100'}`}
                            >
                                Both
                            </button>
                        </div>
                    }
                    <ExerciseChart exercises={filteredExercises} show={graphState}/>
                </div>
            }
        </div>
    );
}