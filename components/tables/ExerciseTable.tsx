import useSWR from "swr";
import { userContext } from "../../pages";
import fetcher from "../../utils/swrFetcher";
import ExerciseTableRow from "./ExerciseTableRow";
import { ExerciseTemplate, Set } from "@prisma/client";
import Modal from "../utilities/Modal";
import { useContext, useEffect, useRef, useState } from "react";
import AddSetForm from "../forms/AddSetForm";
import LoadingTableRow from "./LoadingTableRow";
import { isSameDate } from "../../utils/helpers";
import SearchBar from "../SearchBar";

export interface ExerciseFromSWR{
    id: number,
    accountId: number,
    exerciseTId: number,
    createdAt: string,
    exerciseT: ExerciseTemplate,
    sets: Set[]
}

export default function ExerciseTable(){

    const user = useContext(userContext);
    //const search = useContext(searchContext);
    const [search, setSearch] = useState('');

    //fetch all of the user's exercises using their ID
    const {data, error, mutate} = useSWR<ExerciseFromSWR[]>(`api/exercises/${user?.id}`, fetcher);

    //state to control the modal open and close state
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    //holds the selected exercise id for modal purposes
    const [selectedExerciseId, setSelectedExerciseId] = useState<number>(0);

    //ref to hold date strings
    const date = useRef('');

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

        //return a single exercise that has the given id
        return data.filter(exercise => exercise.id === id)[0];
    }

    //once there is a selected exercise id, open the modal to enter set form
    useEffect(() => {
        if(!selectedExerciseId) return; 

        openModal();
    }, [selectedExerciseId]);

    //return shimmering rows if the exercise data is loading
    if(!data){
        return (
            <div>
                <div className='w-full h-1 mb-1 rounded bg-gradient-to-r from-rose-500 via-violet-500 to-rose-500'/>
                <LoadingTableRow/>
                <LoadingTableRow/>
                <LoadingTableRow/>
                <div className='w-full h-1 mt-6 mb-1 rounded bg-gradient-to-r from-rose-500 via-violet-500 to-rose-500'/>
                <LoadingTableRow/>
                <LoadingTableRow/>
                <LoadingTableRow/>
                <div className='w-full h-1 mt-6 mb-1 rounded bg-gradient-to-r from-rose-500 via-violet-500 to-rose-500'/>
                <LoadingTableRow/>
                <LoadingTableRow/>
                <LoadingTableRow/>
            </div>
        );
    }

    //return error message in the table if the data was not fetched
    if(error){
        return (
            <div>
                <div className='w-full h-0.5 md:h-1 bg-gradient-to-r from-rose-400 via-violet-400 to-rose-400'/>
                <div className="p-4">There was an erorr. Exercises could not load.</div>
                <div className='w-full h-0.5 md:h-1 bg-gradient-to-r from-rose-400 via-violet-400 to-rose-400'/>
            </div>
        )
    }

    return (
        <div id="exercise-table">
            <Modal open={modalOpen} closeModal={closeModal}>
                <AddSetForm exercise={getExerciseById(selectedExerciseId)} close={closeModal} mutate={mutate}/>         
            </Modal>
            
            <SearchBar search={search} setSearch={setSearch}/>
    
            <ul>
                {data
                    .filter((exercise) => exercise.exerciseT.name.toLowerCase().includes(search.toLowerCase()))
                    .map((exercise, i, array) => {

                        //check if the current ref date is the same day as the exercise created date
                        const bSameDate = isSameDate(date.current, exercise.createdAt);

                        //if they do not match update the current ref to the exercise created date
                        if(!bSameDate){ date.current = exercise.createdAt; }

                        //reset the date ref on the last array item
                        if(i + 1 === array.length){ date.current = ''; }
                        
                        return <ExerciseTableRow key={i} index={i} exercise={exercise} setSelectedExerciseId={setSelectedExerciseId} bSameDate={bSameDate}/>;
                    })
                }
            </ul> 
        </div>  
    );
}