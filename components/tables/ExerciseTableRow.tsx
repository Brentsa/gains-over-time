import { faAnglesLeft, faCaretLeft, faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useMemo, useState } from "react";
import { mutate } from "swr";
import { formatDateFullString, getWeekdayColor } from "../../utils/helpers";
import IconButton from "../buttons/IconButton";
import IconSwitchButton from "../buttons/IconSwitchButton";
import SetPill from "../misc/SetPill";
import TargetSetPill from "../misc/TargetSetPill";
import { ExerciseFromSWR } from "./ExerciseTable";
import Modal from "../utilites/Modal";
import { Set } from "@prisma/client";
import UpdateSetForm from "../forms/UpdateSetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    exercise: ExerciseFromSWR
    setSelectedExerciseId: Dispatch<SetStateAction<number>>
}

export default function ExerciseTableRow({exercise, setSelectedExerciseId}: Props){

    //state variables to handle set pill rendering
    const [sets, setSets] = useState<Set[]>(exercise.sets);
    const [showTargetSets, setShowTargetSets] = useState<boolean>(false);

    const [showButtons, setShowButtons] = useState<boolean>(false);

    //state that determines if the sets in the row can be altered
    const [editRow, setEditRow] = useState<boolean>(false);

    //state that determines which set is being edited
    const [editSet, setEditSet] = useState<boolean>(false);
    const [selectedSet, setSelectedSet] = useState<Set | null>(null);

    useEffect(() => {
        if(!selectedSet) return; 
        setEditSet(true);
    }, [selectedSet])

    function closeSetEditModal(){
        setEditSet(false);
        setSelectedSet(null);
    }

    function toggleShowButtons(){
        setShowButtons(prev => !prev);
    }

    //switch edit row to false if show buttons is changed to false
    useEffect(()=>{
        if(!showButtons) setEditRow(false);
    }, [showButtons])

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
        if(editRow) return; 

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
        setEditRow(!editRow);
    }

    useEffect(()=>{
        //update the sets in state if the supplied set array changes
        setSets(exercise.sets);
    }, [exercise.sets]);

    return (
        <li className="flex flex-col">
            <div className="w-full flex flex-wrap py-2 md:space-x-2">
                <div className="flex flex-col basis-7/12 md:basis-52 pb-2 sm:pb-0 order-1">
                    <p className="font-bold text-lg">{exercise.exerciseT.name}</p>
                    <p className="text-sm font-semibold" style={{color: getWeekdayColor(exercise.createdAt)}}>
                        {formatDateFullString(exercise.createdAt)}
                    </p>
                </div>

                <div 
                    className={`flex basis-full md:basis-0 grow transition-all duration-300 shadow-inner h-14 order-3 sm:order-2 space-x-1 overflow-x-auto p-1 rounded bg-violet-200 hover:bg-violet-100 ${!editRow && 'hover:cursor-pointer'}`}
                    onClick={addSet}
                    onMouseOver={toggleShowTargetSets}
                    onMouseOut={toggleShowTargetSets}
                >
                    {sets.length > 0 &&
                        sets.map((set, i) => 
                            <SetPill 
                                key={i} 
                                set={set}
                                setSets={setSets}
                                setType={exercise.exerciseT.type} 
                                editable={editRow}
                                setSelectedSet={setSelectedSet}
                            />
                        )
                    }
                    {showTargetSets && targetSetsArray}
                </div> 
                
                <div className={`flex basis-5/12 md:basis-auto justify-end items-center order-2 sm:order-3 space-x-2`}>
                    <button className={`${showButtons && 'rotate-180'} transition-all duration-300 text-violet-500`} onClick={toggleShowButtons}>
                        <FontAwesomeIcon icon={faAnglesLeft} size='2x'/>
                    </button>  
                    <div className={`flex justify-evenly ${showButtons ? 'w-full' : 'w-0'} transition-all duration-300 overflow-hidden space-x-1`}>
                        <IconSwitchButton icon={faEdit} handleClick={triggerEdit} on={editRow} iconColor='text-amber-500' bgColor='bg-amber-200'/>
                        <IconButton icon={faTrashCan} handleClick={deleteExercise}/> 
                    </div>
                </div>
            </div>
            
            <div className='w-full h-0.5 md:h-1 bg-gradient-to-r from-rose-400 via-violet-400 to-rose-400'/>

            {selectedSet &&
                <Modal closeModal={closeSetEditModal} open={editSet}>
                    <UpdateSetForm set={selectedSet} exercise={exercise} closeModal={closeSetEditModal} setSets={setSets}/>
                </Modal>
            }
        </li>
    )
}