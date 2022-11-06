import { faSave } from "@fortawesome/free-solid-svg-icons";
import {ChangeEvent, FormEvent, useState } from "react";
import { KeyedMutator } from 'swr'
import Button from "../buttons/Button";
import { ExerciseFromSWR } from "../tables/ExerciseTable"
import FormInput from "./FormInput"

interface Props {
    exercise: ExerciseFromSWR | undefined
    close: () => void,
    mutate: KeyedMutator<ExerciseFromSWR[]> 
}

interface Inputs {
    quantity: number | '',
    weight: number | ''
}

export default function AddSetForm({exercise, close, mutate}: Props){

    const [inputs, setInputs] = useState<Inputs>({quantity: '', weight: ''});

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = event.target;

        //if(isNaN(parseInt(value))) return; 

        //if the value in the target is a string, change it to a number
        const numValue = value !== '' ? parseInt(value) : value;
    
        //update input state with the changed variable and leave the rest as is
        setInputs(prevState => ({...prevState, [name]: numValue}));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        
        //return out of the function if there is no exercise ID or either of the inputs are not a number
        if(!exercise?.id || inputs.quantity === '' || inputs.weight === '') return; 

        const response = await fetch('/api/set/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...inputs, exerciseId: exercise.id})
        })

        if(!response.ok) return;

        const responseData = await response.json();

        mutate(exerciseArray => {
            if(!exerciseArray) return; 
        
            for(let i = 0; i < exerciseArray.length; i++){
                if(exerciseArray[i].id === exercise.id){
                    exerciseArray[i].sets.push(responseData);
                }
            }
    
            return [...exerciseArray]; 
        });

        //after completion close the form containing modal
        close();
    }
    

    return exercise ? (
        <div className="flex flex-col justify-around items-center">
            <h2 className="font-bold w-full text-sm sm:text-lg lg:text-xl border-b-2 border-violet-300">
                Add New Set
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    {exercise.exerciseT.type !== 'seconds' &&
                        <FormInput
                            id="quantity"
                            name="quantity"
                            label="Quantity:"
                            value={inputs.quantity}
                            className="w-full"
                            onChange={handleInputChange}
                            type="number"
                        />
                    }
                    <FormInput
                        id="weight"
                        name="weight"
                        label={exercise.exerciseT.type === 'seconds' ? 'Seconds:' : "Weight:"}
                        value={inputs.weight}
                        className="w-full"
                        onChange={handleInputChange}
                        type="number"
                    />
                </div>
                <Button icon={faSave} type="submit" label="Save" className="w-full"/>
            </form>
        </div>
    ) : 
    <div>Form could not load.</div>
}