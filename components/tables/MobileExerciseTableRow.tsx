import { Dispatch, MouseEvent, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from "react";
import { mutate } from "swr";
import { capitalizeAllWords, formatDateFullString, isToday } from "../../utils/helpers";
import SetPill from "../misc/SetPill";
import TargetSetPill from "../misc/TargetSetPill";
import { ExerciseFromSWR } from "./ExerciseTable";
import Modal from "../utilities/Modal";
import { Set } from "@prisma/client";
import UpdateSetForm from "../forms/UpdateSetForm";
import ExerciseHistory from "../misc/ExerciseHistory";
import { feedbackContext } from "../MainPageContainer";
import Paper from "../utilities/Paper";
import ExerciseDeleteForm from "../forms/ExerciseDeleteForm";
import { useSwipeable } from "react-swipeable";
import IconButton from "../buttons/IconButton";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import IconSwitchButton from "../buttons/IconSwitchButton";
import ChangeExerciseForm from "../forms/ChangeExerciseForm";
import ShakeSystem from "../misc/ShakeSystem";

interface Props {
    exercise: ExerciseFromSWR
    setSelectedExerciseId: Dispatch<SetStateAction<number>>
    bSameDate: boolean
    index: number
}

export default function MobileExerciseTableRow({exercise, setSelectedExerciseId, bSameDate, index}: Props){

    const {setFeedback} = useContext(feedbackContext);

    const liRef = useRef<HTMLLIElement>(null);

    //state to determine if the row is swiped open or not
    const [swipedOpen, setSwipedOpen] = useState(false);

    //state variables to handle set pill rendering
    const [sets, setSets] = useState<Set[]>(exercise.sets);
    const [showTargetSets, setShowTargetSets] = useState<boolean>(false);

    const [viewExerciseHistory, setViewExerciseHistory] = useState<boolean>(false);

    //state that determines if the row can be altered
    const [editRow, setEditRow] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openChangeExerciseModal, setOpenChangeExerciseModal] = useState<boolean>(false);

    //state that determines which set is being edited
    const [editSet, setEditSet] = useState<boolean>(false);
    const [selectedSet, setSelectedSet] = useState<Set | null>(null);

    //define swipe handlers for the component
    const handlers = useSwipeable({
        //onSwiped: (eventData) => console.log("User Swiped!", eventData),
        onSwipedLeft: () => setSwipedOpen(true),
        onSwipedRight: () => setSwipedOpen(false),
        swipeDuration: 350,
        preventScrollOnSwipe: true,
        trackMouse: true
    });

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

    function closeSetEditModal(){
        setEditSet(false);
        setSelectedSet(null);
    }

    function addSet(event: MouseEvent<HTMLDivElement>){
        event.preventDefault();
        
        //if editing, exit the function
        if(editRow) return; 

        //when a user adds a set, update the selected set state from the exercise table
        setSelectedExerciseId(exercise.id)
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

    function openDeleteExerciseModal(){
        setOpenDeleteModal(true);
    }

    function closeDeleteExerciseModal(){
        setOpenDeleteModal(false);
    }

    function openExerciseHistory(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        setViewExerciseHistory(true);
    }

    function closeExerciseHistory(){
        setViewExerciseHistory(false);
    }

    //Open a model to switch a row's associated exercise
    function openSwitchExercise(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        setOpenChangeExerciseModal(true)
    }

    //close the change exercise modal
    function closeSwitchExercise(){
        setOpenChangeExerciseModal(false);
    }

    //if the user clicks outside this component, set the buttons to closed
    function clickOutsideRow(event: globalThis.MouseEvent){
        if(!liRef.current?.contains(event.target as Node)) setEditRow(false);
    }

    useEffect(() => {
        if(!selectedSet) return; 
        setEditSet(true);
    }, [selectedSet]);

    useEffect(()=>{ 
        if(editRow) 
            //add an event listener when the buttons are showing to close them if the user clicks outside this component
            document.addEventListener('mousedown', clickOutsideRow);
        else 
            //remove the even listener when the buttons are closed
            document.removeEventListener('mousedown', clickOutsideRow);

        //remove the event listener if the component is unmounted
        return ()=> document.removeEventListener('mousedown', clickOutsideRow);
    }, [editRow]);

    useEffect(()=>{
        //update the sets in state if the supplied set array changes
        setSets(exercise.sets);
    }, [exercise.sets]);

    return (
        <li ref={liRef}>
            {!bSameDate && 
                <div className="px-2 sm:px-0">
                    <div className={`pl-0 sm:pl-2 text-2xl sm:text-3xl w-full font-light ${index !== 0 ? 'pt-6' : ''} `}>
                        <p>{ isToday(exercise.createdAt) ? "Today's Workout" : formatDateFullString(exercise.createdAt) }</p>
                    </div>
                    <div className='w-full h-1 mb-3 sm:mb-4 rounded bg-gradient-to-r from-rose-500 via-violet-500 to-rose-500'/>
                </div>
            }

            <div className="relative h-36">
                <Paper className={`flex flex-col p-2 w-full h-full z-10 rounded absolute transition-all ${swipedOpen ? '-left-14' : 'left-0'}`} paddingNone>
                    <div id={"exercise-" + exercise.id} className="w-full flex flex-col justify-end">
                        <div className="flex justify-between" {...handlers}>
                            <ShakeSystem 
                                bShake={editRow}
                                className={`flex flex-col sm:items-center p-1 px-2 mb-2 rounded-lg ${editRow && 'text-white bg-rose-500'}`}
                                shakeDegree={2}
                            >
                                <button 
                                    className="flex flex-col justify-start items-start"
                                    style={{WebkitTapHighlightColor: 'transparent'}}
                                    onClick={!editRow ? openExerciseHistory : openSwitchExercise}
                                >
                                    <p className="font-medium text-lg">{capitalizeAllWords(exercise.exerciseT.name)}</p>
                                    <p className="text-sm">{exercise.exerciseT.targetSets} sets x {exercise.exerciseT.targetReps} reps</p>
                                </button>
                            </ShakeSystem>
                            <IconSwitchButton icon={faEdit} handleClick={triggerEdit} on={editRow} iconColor='text-violet-400' bgColor='bg-violet-200'/>
                        </div>
                        <div 
                            className={`flex shadow-inner h-16 p-2 space-x-1 overflow-x-auto rounded bg-violet-200`}
                            onClick={addSet}
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
                    </div>

                    {selectedSet &&
                        <Modal closeModal={closeSetEditModal} open={editSet}>
                            <UpdateSetForm set={selectedSet} exercise={exercise} closeModal={closeSetEditModal} setSets={setSets}/>
                        </Modal>
                    }

                    <Modal closeModal={closeSwitchExercise} open={openChangeExerciseModal} overflowVisible>
                        <ChangeExerciseForm exercise={exercise} closeModal={closeSwitchExercise}/>
                    </Modal>

                    <Modal closeModal={closeExerciseHistory} open={viewExerciseHistory}>
                        <ExerciseHistory userId={exercise.accountId} exerciseTId={exercise.exerciseTId} exerciseType={exercise.exerciseT.type}/>
                    </Modal>

                    <Modal closeModal={closeDeleteExerciseModal} open={openDeleteModal}>
                        <ExerciseDeleteForm deleteExercise={deleteExercise} closeForm={closeDeleteExerciseModal}/>
                    </Modal>
                </Paper>
                <div className="absolute right-0 h-full flex items-center">
                    <IconButton bgColor="bg-rose-500" bgColorTouch="bg-rose-400" iconColor="text-white" icon={faTrashCan} handleClick={openDeleteExerciseModal}/> 
                </div>
            </div>
        </li>
    )
}