

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormEvent } from 'react';
import { Props } from '../../pages/index'
import Button from '../buttons/Button';
import ExerciseTemplateSelect from "./ExerciseTemplateSelect";

export default function AddExerciseForm({user}: Props){

    if(!user?.id) return <div>Error loading exercises.</div>

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log('clicked');
    }

    return (
        <form onSubmit={handleSubmit} className="flex justify-between">
            <ExerciseTemplateSelect id={user.id}/>
            <Button label='Add' type='submit' icon={faPlus} iconRight/>
        </form>
    )
}