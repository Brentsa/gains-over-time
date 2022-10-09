import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useState } from 'react';
import { Props } from '../../pages/index'
import Button from '../buttons/Button';
import ExerciseTemplateSelect from "./ExerciseTemplateSelect";
import { ExerciseTemplate } from "@prisma/client";
import useSWR from "swr"
import fetcher from "../../utils/swrFetcher"

export default function AddExerciseForm({user}: Props){

    const {data, error} = useSWR<ExerciseTemplate[]>(`api/exercise-templates/${user?.id}`, fetcher);

    const [selectedExercise, setSelectedExercise] = useState<ExerciseTemplate | undefined>(undefined);

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log('clicked');
        console.log(selectedExercise);
    }

    if(!user?.id || error) return <div>Error loading exercises.</div>
    if(!data) return <div>Loading...</div>

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-10 gap-x-2">
            <ExerciseTemplateSelect exerciseTemplates={data} setSelectedExercise={setSelectedExercise} className="col-span-7 sm:col-span-8"/>
            <Button label='Add' type='submit' icon={faPlus} iconRight className="col-span-3 sm:col-span-2"/>
        </form>
    )
}