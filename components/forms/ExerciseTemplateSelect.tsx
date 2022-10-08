import { ExerciseTemplate } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr"
import fetcher from "../../utils/swrFetcher"

interface Props{
    id: number
}

export default function ExerciseTemplateSelect({id}: Props){

    const [selectedExerciseId, setSelectedExerciseId] = useState<number | undefined>(undefined);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseTemplate | undefined>(undefined);

    const {data} = useSWR<ExerciseTemplate[]>(`api/exercise-templates/${id}`, fetcher);

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void{
        event.preventDefault();
        setSelectedExerciseId(parseInt(event.target.value));
    }

    useEffect(() => {
        if(!selectedExerciseId || !data) return; 

        setSelectedExercise(data.filter(exercise => selectedExerciseId === exercise.id)[0])

    }, [selectedExerciseId, data])

    return (
        <div>
            <label htmlFor="exercise-template-select" className="text-sm sr-only">
                New Exercise:
            </label>
            {!data ?
                <div>loading...</div> 
                :
                <div className="w-full grid grid-cols-12 gap-x-4">
                    <div className="col-span-6 lg:col-span-3">
                        <select
                            id="exercise-template-select"
                            name="exercise"
                            className={`rounded relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10 sm:text-sm`}
                            value={selectedExerciseId}
                            onChange={handleSelectChange}
                        >
                            <option defaultValue={undefined}>Select Exercise</option>
                            {data.map((exercise, id) => <option key={id} value={exercise.id}>{exercise.name}</option>)}
                        </select>
                    </div>
                    {selectedExercise &&
                        <div className="col-span-6 lg:col-span-9 flex">
                            <div className="flex items-center">Target: {selectedExercise.targetSets} Sets x {selectedExercise.targetReps} Reps</div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}