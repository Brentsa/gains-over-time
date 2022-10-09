import { ExerciseTemplate } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props{
    exerciseTemplates: ExerciseTemplate[],
    setSelectedExercise: Dispatch<SetStateAction<ExerciseTemplate | undefined>>,
    className?: string
}

export default function ExerciseTemplateSelect({exerciseTemplates, setSelectedExercise, className}: Props){

    const [selectedExerciseId, setSelectedExerciseId] = useState<number | undefined>(undefined);

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void{
        event.preventDefault();
        setSelectedExerciseId(parseInt(event.target.value));
    }

    useEffect(() => {
        if(!selectedExerciseId) return; 
        setSelectedExercise(exerciseTemplates.filter(exercise => selectedExerciseId === exercise.id)[0]);
    }, [selectedExerciseId, setSelectedExercise, exerciseTemplates]);

    return (
        <div className={className}>
            <label htmlFor="exercise-template-select" className="text-sm sr-only">
                New Exercise:
            </label>
            <div className="w-full">
                <select
                    id="exercise-template-select"
                    name="exercise"
                    className={`rounded relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10 sm:text-sm`}
                    value={selectedExerciseId}
                    onChange={handleSelectChange}
                >
                    <option defaultValue={undefined}>Select Exercise</option>
                    {exerciseTemplates.map((exercise, id) => <option key={id} value={exercise.id}>{exercise.name} - {exercise.targetSets} x {exercise.targetReps}</option>)}
                </select>
            </div>
        </div>
    )
}