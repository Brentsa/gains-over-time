import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Set } from "@prisma/client";
import { Dispatch, MouseEvent, SetStateAction, useMemo, useState } from "react";
import { mutate } from "swr";
import { formatDateFullString } from "../../utils/helpers";
import IconButton from "../buttons/IconButton";
import SetPill from "../misc/SetPill";
import TargetSetPill from "../misc/TargetSetPill";
import { ExerciseFromSWR } from "./ExerciseTable";

interface Props {
    exercise: ExerciseFromSWR
    setSelectedExerciseId: Dispatch<SetStateAction<number>>
}

interface BasicSet{
    quantity: number,
    weight: number
}

export default function ExerciseTableRow({exercise, setSelectedExerciseId}: Props){

    const [sets, setSets] = useState<BasicSet[]>(exercise.sets);
    const [showTargetSets, setShowTargetSets] = useState<boolean>(false);

    //return an array of target set pills for rendering in JSX
    const targetSetsArray = useMemo(() => {
        const setArray: JSX.Element[] = [];

        //calculate the number of target sets that should show
        const loopCount: number = exercise.exerciseT.targetSets - sets.length;

        //if the loop count is 0 or negative return an empty array
        if(loopCount <= 0) return setArray;
        
        const {targetReps, type} = exercise.exerciseT;

        //push a pill into the set array for the exercise target sets
        for(let i = 0; i < loopCount ; i++){
            setArray.push(<TargetSetPill key={i} numReps={targetReps} setType={type}/>)
        }

        return setArray;
    }, [exercise.exerciseT, sets.length]);

    function toggleShowTargetSets(){
        setShowTargetSets(prev => !prev);
    }

    function addSet(event: MouseEvent<HTMLDivElement>){
        event.preventDefault();
        
        //when a user adds a set, update the selected set state from the exercise table
        setSelectedExerciseId(exercise.id)

        setSets((prevSets) => [...prevSets, {quantity: 10, weight: 200}]);
    }

    async function deleteExercise(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        
        //try deleting this exercise
        const response = await fetch(`api/exercise/delete/${exercise.id}`, {
            method: 'DELETE'
        });

        if(!response.ok) return;

        //if the delete request is ok, trigger exercise swr revalidation
        mutate(`api/exercises/${exercise.accountId}`);
    }

    return (
        <li className="flex flex-col">
            <div className="w-full grid grid-cols-12 py-2">
                <div className="flex flex-col col-span-10 md:col-span-4 lg:col-span-3 pb-2 sm:pb-0 order-1">
                    <div className="font-semibold text-lg">{exercise.exerciseT.name}</div>
                    <div className="text-sm">{formatDateFullString(exercise.createdAt)}</div>
                </div>
                <div 
                    className="col-span-full md:col-span-7 lg:col-span-8 flex p-1 space-x-1 overflow-hidden bg-gray-200 hover:bg-gray-100 hover:cursor-pointer rounded h-14 sm:h-full order-3 sm:order-2" 
                    onClick={addSet}
                    onMouseOver={toggleShowTargetSets}
                    onMouseOut={toggleShowTargetSets}
                >
                    {sets.length > 0 &&
                        sets.map((set, i) => <SetPill key={i} quantity={set.quantity} weight={set.weight}/>)
                    }
                    {showTargetSets && targetSetsArray}
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-center items-center order-2 sm:order-3">
                    <IconButton icon={faTrashCan} handleClick={deleteExercise}/>
                </div>
            </div>
            <div className='w-full h-0.5 bg-gradient-to-r from-rose-400 via-violet-400 to-rose-400'/>
        </li>
    )
}