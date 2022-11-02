import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useEffect, useState } from 'react';
import { Props } from '../../pages/index'
import Button from '../buttons/Button';
import ExerciseTemplateSelect from "./ExerciseTemplateSelect";
import { ExerciseTemplate } from "@prisma/client";
import useSWR, { mutate } from "swr"
import fetcher from "../../utils/swrFetcher"

export default function AddExerciseForm({user}: Props){

    const {data, error} = useSWR<ExerciseTemplate[]>(`api/exercise-templates/${user?.id}`, fetcher);

    //state to hold the data of the currently selected exercise template
    const [selectedExercise, setSelectedExercise] = useState<ExerciseTemplate | undefined>(undefined);

    //state to trigger a state reset in the child select menu
    const [reset, setReset] = useState<boolean>(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(selectedExercise);

        if(!selectedExercise?.id || !user?.id) return;

        const response = await fetch('api/exercise/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({exerciseTId: selectedExercise.id, accountId: user.id})
        })

        if(!response.ok) return;

        //reset the state associated with this form and trigger a reset for the select menu
        setSelectedExercise(undefined);
        setReset(true);

        //on successful submit, trigger an SWR revalidate for the user's exercises
        mutate(`api/exercises/${user?.id}`);
    }

    //if reset changes to true, set it back to false
    useEffect(() => {
        if(reset) return setReset(false);
    }, [reset])

    if(!user?.id || error) return <div>Error loading exercises.</div>
    if(!data) return <div>Loading...</div>

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-10 gap-x-2">
            <ExerciseTemplateSelect exerciseTemplates={data} setSelectedExercise={setSelectedExercise} className="col-span-6 sm:col-span-7" reset={reset}/>
            <Button label='Add' type='submit' icon={faPlus} iconRight className="col-span-4 sm:col-span-3" disabled={!selectedExercise}/>
        </form>
    )
}