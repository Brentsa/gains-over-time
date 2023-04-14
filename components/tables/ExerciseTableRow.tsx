import { faAnglesLeft, faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, MouseEvent, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from "react";
import { mutate } from "swr";
import { capitalizeAllWords, formatDateFullString, isToday } from "../../utils/helpers";
import IconButton from "../buttons/IconButton";
import IconSwitchButton from "../buttons/IconSwitchButton";
import SetPill from "../misc/SetPill";
import TargetSetPill from "../misc/TargetSetPill";
import { ExerciseFromSWR } from "./ExerciseTable";
import Modal from "../utilities/Modal";
import { Set } from "@prisma/client";
import UpdateSetForm from "../forms/UpdateSetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExerciseHistory from "../misc/ExerciseHistory";
import { feedbackContext } from "../MainPageContent";
import Paper from "../utilities/Paper";
import ExerciseDeleteForm from "../forms/ExerciseDeleteForm";

interface Props {
    exercise: ExerciseFromSWR
    setSelectedExerciseId: Dispatch<SetStateAction<number>>
    bSameDate: boolean
    index: number
}

export default function ExerciseTableRow({exercise, setSelectedExerciseId, bSameDate, index}: Props){

    const {setFeedback} = useContext(feedbackContext);

    const liRef = useRef<HTMLLIElement>(null);

    //state variables to handle set pill rendering
    const [sets, setSets] = useState<Set[]>(exercise.sets);
    const [showTargetSets, setShowTargetSets] = useState<boolean>(false);

    const [showButtons, setShowButtons] = useState<boolean>(false);
    const [viewExerciseHistory, setViewExerciseHistory] = useState<boolean>(false);

    //state that determines if the sets in the row can be altered
    const [editRow, setEditRow] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] =useState<boolean>(false);

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

    function addSet(event: MouseEvent<HTMLDivElement>){
        event.preventDefault();
        
        //if editing, exit the function
        if(editRow) return; 

        //when a user adds a set, update the selected set state from the exercise table
        setSelectedExerciseId(exercise.id)
    }

    function openDeleteExerciseModal(){
        setOpenDeleteModal(true);
    }

    function closeDeleteExerciseModal(){
        setOpenDeleteModal(false);
    }

    async function deleteExercise(){
        
        //try deleting this exercise
        const response = await fetch(`api/exercise/delete/${exercise.id}`, {
            method: 'DELETE'
        });

        //if the response is not ok, present the user with an error feedback message
        if(!response.ok) return setFeedback({type: 'failure', message: 'Exercise could not be deleted.'});

        //if the delete request is ok, trigger exercise swr revalidation
        mutate(`api/exercises/${exercise.accountId}`);

        //Provide feedback to the use indicating the exercise has been deleted
        setFeedback({type: 'success', message: 'Exercise was deleted'});
    }

    function triggerEdit(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        setEditRow(!editRow);
    }

    function openExerciseHistory(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        setViewExerciseHistory(true);
    }

    function closeExerciseHistory(){
        setViewExerciseHistory(false);
    }

    //if the user clicks outside this component, set the buttons to closed
    function clickOutsideRow(event: globalThis.MouseEvent){
        if(!liRef.current?.contains(event.target as Node)) setShowButtons(false);
    }

    useEffect(()=>{ 
        if(showButtons) 
            //add an event listener when the buttons are showing to close them if the user clicks outside this component
            document.addEventListener('mousedown', clickOutsideRow);
        else 
            //remove the even listener when the buttons are closed
            document.removeEventListener('mousedown', clickOutsideRow);

        //remove the event listener if the component is unmounted
        return ()=> document.removeEventListener('mousedown', clickOutsideRow);
    }, [showButtons])

    //if the exercise in the row changes, close the edit buttons
    useEffect(()=>{
        setShowButtons(false);
    }, [exercise])

    useEffect(()=>{
        //update the sets in state if the supplied set array changes
        setSets(exercise.sets);
    }, [exercise.sets]);

    return (
        <li ref={liRef}>
            {!bSameDate && 
                <div className="px-2 sm:px-0">
                    <div className={`${index !== 0 && 'pt-6'} pl-0 sm:pl-2 text-2xl sm:text-3xl w-full font-light`}>
                        <p>{ isToday(exercise.createdAt) ? "Today's Workout" : formatDateFullString(exercise.createdAt) }</p>
                    </div>
                    <div className='w-full h-1 mb-3 sm:mb-4 rounded bg-gradient-to-r from-rose-500 via-violet-500 to-rose-500'/>
                </div>
            }

            <Paper className="flex flex-col p-2" paddingNone>
                <div id={"exercise-" + exercise.id} className="w-full flex flex-wrap justify-between items-center md:space-x-2">

                    <button className="flex flex-col sm:items-center basis-7/12 md:basis-52 pb-2 sm:pb-0 order-1" onClick={openExerciseHistory}>
                        <p className="font-medium text-lg">{capitalizeAllWords(exercise.exerciseT.name)}</p>
                        <p className="text-sm">{exercise.exerciseT.targetSets} sets x {exercise.exerciseT.targetReps} reps</p>
                    </button>

                    <div 
                        className={`flex basis-full md:basis-0 grow transition-all duration-500 shadow-inner h-14 order-3 sm:order-2 space-x-1 overflow-x-auto p-1 rounded bg-violet-200 hover:bg-violet-100 ${!editRow && 'hover:cursor-pointer'}`}
                        onClick={addSet}
                        onMouseOver={() => setShowTargetSets(true)}
                        onMouseOut={() => setShowTargetSets(false)}
                        onTouchStart={() => setShowTargetSets(true)}
                        onTouchEnd={() => setShowTargetSets(false)}
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
                    
                    <div className={`flex ${showButtons ? 'basis-5/12  md:basis-36' : 'basis-10'} transition-all duration-500 overflow-hidden space-x-2 justify-end items-center order-2 sm:order-3`}>
                        <button className={`${showButtons && 'rotate-180'} transition-all duration-500 text-violet-500`} onClick={toggleShowButtons}>
                            <FontAwesomeIcon icon={faAnglesLeft} size='2x'/>
                        </button>  
                        <div className={`flex justify-evenly overflow-hidden space-x-1`}>
                            <IconSwitchButton icon={faEdit} handleClick={triggerEdit} on={editRow} iconColor='text-amber-500' bgColor='bg-amber-200'/>
                            <IconButton icon={faTrashCan} handleClick={openDeleteExerciseModal}/> 
                        </div>
                    </div>
                </div>

                {selectedSet &&
                    <Modal closeModal={closeSetEditModal} open={editSet}>
                        <UpdateSetForm set={selectedSet} exercise={exercise} closeModal={closeSetEditModal} setSets={setSets}/>
                    </Modal>
                }

                <Modal closeModal={closeExerciseHistory} open={viewExerciseHistory}>
                    <ExerciseHistory userId={exercise.accountId} exerciseTId={exercise.exerciseTId} exerciseType={exercise.exerciseT.type}/>
                </Modal>

                <Modal closeModal={closeDeleteExerciseModal} open={openDeleteModal}>
                    <ExerciseDeleteForm deleteExercise={deleteExercise} closeForm={closeDeleteExerciseModal}/>
                </Modal>
            </Paper>
        </li>
    )
}