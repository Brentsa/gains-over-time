import { ExerciseTemplate } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { capitalizeAllWords } from "../../utils/helpers";
import DropdownItem from "../utilities/DropdownItem";
import DropdownList from "../utilities/DropdownList";

interface Props{
    exerciseTemplates: ExerciseTemplate[],
    setSelectedExercise: Dispatch<SetStateAction<ExerciseTemplate | undefined>>,
    className?: string,
    reset: boolean, 
}

export default function ExerciseTemplateSelect({exerciseTemplates, setSelectedExercise, className, reset}: Props){

    const [selectedExerciseId, setSelectedExerciseId] = useState<number>(0);

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void{
        event.preventDefault();
        setSelectedExerciseId(parseInt(event.target.value));
    }

    useEffect(() => {
        if(!selectedExerciseId){
            return setSelectedExercise(undefined); 
        } 

        //find the selected exercise by id and set it into state.
        setSelectedExercise(exerciseTemplates.filter(exercise => selectedExerciseId === exercise.id)[0]);
    }, [selectedExerciseId, setSelectedExercise, exerciseTemplates]);

    useEffect(() =>{ 
        if(reset) return setSelectedExerciseId(0);
    }, [reset])

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
                    <option defaultValue={0} value={0}>Select Exercise</option>
                    {exerciseTemplates.map((exercise, id) => <option key={id} value={exercise.id}>{capitalizeAllWords(exercise.name)} - {exercise.targetSets} x {exercise.targetReps}</option>)}
                </select>
            </div>
        </div>
    )
}

// export default function ExerciseTemplateSelect({exerciseTemplates, setSelectedExercise, className, reset}: Props){

//     const [selectedExerciseId, setSelectedExerciseId] = useState<number>(0);

//     function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void{
//         event.preventDefault();
//         setSelectedExerciseId(parseInt(event.target.value));
//     }

//     useEffect(() => {
//         if(!selectedExerciseId){
//             return setSelectedExercise(undefined); 
//         } 

//         //find the selected exercise by id and set it into state.
//         setSelectedExercise(exerciseTemplates.filter(exercise => selectedExerciseId === exercise.id)[0]);
//     }, [selectedExerciseId, setSelectedExercise, exerciseTemplates]);

//     useEffect(() =>{ 
//         if(reset) return setSelectedExerciseId(0);
//     }, [reset])

//     return (
//         <div className={className}>
//             <label htmlFor="exercise-template-select" className="text-sm sr-only">
//                 New Exercise:
//             </label>
//             <div className="w-full">
//                 <DropdownList
//                     value={selectedExerciseId}
//                     onChange={handleSelectChange}
//                 >
//                     {exerciseTemplates.map((exercise, id) => 
//                         <DropdownItem 
//                             key={id} 
//                             value={exercise.id}
//                         >
//                             {capitalizeAllWords(exercise.name)} - {exercise.targetSets} x {exercise.targetReps}
//                         </DropdownItem>)
//                     }
//                 </DropdownList>
//             </div>
//         </div>
//     )
// }