import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { userContext } from '../../pages/index'
import Button from '../buttons/Button';
import { ExerciseTemplate } from "@prisma/client";
import useSWR, { mutate } from "swr"
import fetcher from "../../utils/swrFetcher"
import ExerciseDropdownList from '../utilities/ExerciseDropdownList';
import { feedbackContext } from '../MainPageContainer';

interface Props{
    mobile?: boolean
}

export default function AddExerciseForm({mobile}: Props){

    const {user} = useContext(userContext);
    const {setFeedback} = useContext(feedbackContext);

    const {data, error } = useSWR<ExerciseTemplate[]>(`api/exercise-templates/${user?.id}`, fetcher);

    //state to hold the data of the currently selected exercise template
    const [selectedExercise, setSelectedExercise] = useState<ExerciseTemplate | undefined>(undefined);

    //state to trigger a state reset in the child select menu
    const [reset, setReset] = useState<boolean>(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(!selectedExercise?.id || !user?.id) return;

        const response = await fetch('api/exercise/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({exerciseTId: selectedExercise.id, accountId: user.id})
        })

        //if the response is not ok, present the user with an error feedback message
        if(!response.ok) return setFeedback({type: 'failure', message: 'Exercise was not added'});

        //reset the state associated with this form and trigger a reset for the select menu
        setSelectedExercise(undefined);
        setReset(true);

        //on successful submit, trigger an SWR revalidate for the user's exercises
        mutate(`api/exercises/${user?.id}`);

        //return feedback to the user
        setFeedback({type: 'success', message: 'New exercise added'});
    }

    //if reset changes to true, set it back to false
    useEffect(() => {
        if(reset) return setReset(false);
    }, [reset])
    
    //return a loading or error placeholder while the data is still being pulled
    if(!data){
        return (
            <div className="flex flex-col xl:flex-row">
                <div className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 text-gray-500'>
                    {!user?.id || error ? 'Error loading exercises.': 'Loading...'}
                </div>
                <Button 
                    className="basis-full xl:basis-1/4 mt-2 xl:mt-0 xl:ml-2"
                    label='Add'
                    icon={faPlus} 
                    iconRight  
                    disabled
                />
            </div>
        );
    }

    return (
        // <form onSubmit={handleSubmit} className="flex flex-col xl:flex-row" id='add-exercise-form'>
        //     <ExerciseDropdownList 
        //         className="basis-full xl:basis-3/4"
        //         state={selectedExercise}
        //         dropdownItems={data}
        //         updateState={setSelectedExercise}
        //     />
        //     <Button 
        //         className="basis-full xl:basis-1/4 mt-2 xl:mt-0 xl:ml-2"
        //         label='Add' 
        //         type='submit' 
        //         icon={faPlus} 
        //         iconRight  
        //         disabled={!selectedExercise}
        //     />
        // </form>

        <form onSubmit={handleSubmit} className={mobile ? "relative" : "flex"} id='add-exercise-form'>
            <ExerciseDropdownList 
                className={mobile ? "w-full" : "basis-3/4"}
                state={selectedExercise}
                dropdownItems={data}
                updateState={setSelectedExercise}
            />
            <Button 
                className={mobile ? `absolute rounded-b-full px-8 -z-10 duration-200 shadow-lg shadow-black/20 transition-all right-0 h-12 ${selectedExercise ? 'top-14' : 'top-0'}` : 'basis-1/4 ml-2'}
                label='Add' 
                type='submit' 
                icon={faPlus} 
                iconRight  
                disabled={!selectedExercise}
            />
        </form>
    )
}