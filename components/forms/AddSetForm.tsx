import {ChangeEvent, FormEvent, useState } from "react";
import { KeyedMutator } from 'swr'
import { ExerciseFromSWR } from "../tables/ExerciseTable"
import SetForm from "./SetForm";

interface Props {
    exercise: ExerciseFromSWR | undefined
    close: () => void,
    mutate: KeyedMutator<ExerciseFromSWR[]> 
}

export interface SetInputs {
    quantity: number | '',
    weight: number | ''
}

export default function AddSetForm({exercise, close, mutate}: Props){

    const [inputs, setInputs] = useState<SetInputs>({quantity: '', weight: ''});

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = event.target;

        //if the value in the target is a string, change it to a number
        const numValue = value !== '' ? parseInt(value) : value;
    
        //update input state with the changed variable and leave the rest as is
        setInputs(prevState => ({...prevState, [name]: numValue}));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        
        //return out of the function if there is no exercise ID or either of the inputs are not a number
        if(!exercise?.id || (inputs.weight === '' && exercise.exerciseT.type === 'lbs') || inputs.quantity === '') return; 

        const response = await fetch('/api/set/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                quantity: inputs.quantity, 
                weight: exercise.exerciseT.type === 'lbs' ? inputs.weight : 0,
                exerciseId: exercise.id
            })
        })

        if(!response.ok) return;

        //revalidate the useSWR data
        mutate();

        //after completion close the form containing modal
        close();
    }
    

    return exercise ? (
        <div className="w-8/12 flex flex-col justify-around items-center">
            <h2 className="font-bold w-full mb-2 text-sm sm:text-lg lg:text-xl border-b-2 border-violet-300">
                Add New Set
            </h2>
            <SetForm exercise={exercise} inputs={inputs} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
        </div>
    ) : 
    <div>Form could not load.</div>
}