import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useMemo, useState } from "react";
import { mutate } from "swr";
import { formatDateFullString, getWeekdayColor } from "../../utils/helpers";
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
    const [editSets, setEditSets] = useState<boolean>(false);

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
        
        //if editing, exit the function
        if(editSets) return; 

        //when a user adds a set, update the selected set state from the exercise table
        setSelectedExerciseId(exercise.id)
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

    function triggerEdit(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        setEditSets(!editSets);
    }

    useEffect(()=>{
        //update the sets in state if the supplied set array changes
        setSets(exercise.sets);
    }, [exercise.sets]);

    return (
        <li className="flex flex-col">
            <div className="w-full flex flex-wrap py-2 md:space-x-4">
                <div className="flex flex-col basis-8/12 md:basis-auto pb-2 sm:pb-0 order-1">
                    <p className="font-bold text-lg">{exercise.exerciseT.name}</p>
                    <p className="text-sm font-semibold" style={{color: getWeekdayColor(exercise.createdAt)}}>
                        {formatDateFullString(exercise.createdAt)}
                    </p>
                </div>
                <div 
                    className="flex basis-full md:basis-0 grow p-1 space-x-1 overflow-x-scroll shadow-inner bg-violet-200 hover:bg-violet-100 hover:cursor-pointer rounded h-14 order-3 sm:order-2" 
                    onClick={addSet}
                    onMouseOver={toggleShowTargetSets}
                    onMouseOut={toggleShowTargetSets}
                >
                    {sets.length > 0 &&
                        sets.map((set, i) => <SetPill key={i} quantity={set?.quantity} weight={set.weight} setType={exercise.exerciseT.type} editable={editSets}/>)
                    }
                    {showTargetSets && targetSetsArray}
                </div>
                <div className="flex basis-4/12 md:basis-auto justify-center items-center order-2 sm:order-3">
                    <IconButton icon={faEdit} handleClick={triggerEdit} className="text-amber-500 hover:bg-amber-100"/>
                    <IconButton icon={faTrashCan} handleClick={deleteExercise}/>
                </div>
            </div>
            <div className='w-full h-0.5 md:h-1 bg-gradient-to-r from-rose-400 via-violet-400 to-rose-400'/>
        </li>
    )
}