import useSWR from "swr";
import { Props } from "../../pages";
import fetcher from "../../utils/swrFetcher";
import ExerciseTableRow from "./ExerciseTableRow";
import { ExerciseTemplate, Set } from "@prisma/client";
import Modal from "../utilites/Modal";
import { MouseEvent, useEffect, useState } from "react";
import AddSetForm from "../forms/AddSetForm";

export interface ExerciseFromSWR{
    id: number,
    accountId: number,
    exerciseTId: number,
    createdAt: string,
    exerciseT: ExerciseTemplate,
    sets: Set[]
}

export default function ExerciseTable({user}: Props){

    //fetch all of the user's exercises using their ID
    const {data, error} = useSWR<ExerciseFromSWR[]>(`api/exercises/${user?.id}`, fetcher);

    //state to control the modal open and close state
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    //holds the selected exercise id for modal purposes
    const [selectedExerciseId, setSelectedExerciseId] = useState<number>(0);

    //Set modal open state to true
    function openModal(){
        setModalOpen(true);
    }

    //Set the modal open state to false
    function closeModal(){
        //reset the selected exercise id
        setSelectedExerciseId(0);

        //close the modal to reset state
        setModalOpen(false);
    }

    function getExerciseById(id: number){
        if(!data) return; 

        const filteredExercise = data.filter(exercise => exercise.id === id);

        return filteredExercise[0];
    }

    //once there is a selected exercise id, open the modal to enter set form
    useEffect(() => {
        if(!selectedExerciseId) return; 

        openModal();
    }, [selectedExerciseId])

    if(!data || error) return <div>Exercises could not load.</div>

    return (
        <div>
            <Modal open={modalOpen} closeModal={closeModal}>
                <AddSetForm exercise={getExerciseById(selectedExerciseId)} close={closeModal}/>
            </Modal>
            <div className='w-full h-0.5 bg-gradient-to-r from-rose-400 via-violet-400 to-rose-400'/>
            <ul>
                {data.map((exercise, i) => <ExerciseTableRow key={i} exercise={exercise} setSelectedExerciseId={setSelectedExerciseId}/>)}
            </ul> 
        </div>  
    );
}