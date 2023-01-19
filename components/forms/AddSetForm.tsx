import {ChangeEvent, FormEvent, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { KeyedMutator } from 'swr'
import { feedbackContext } from "../MainPageContent";
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

    const {setFeedback} = useContext(feedbackContext);

    //determine if the screen is mobile
    const isMobile = useMediaQuery({query: `(max-width: 1024px)`});

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

        //return feedback to the user
        setFeedback('New set logged!');

        //revalidate the useSWR data
        mutate();

        //move the screen to the top of the page to show the newly created set if on a mobile screen
        if(isMobile && exercise){ 
            const yOffset = 100;
            const lineItem = document.getElementById('exercise-' + exercise.id);

            //calculate the y pixel coordinate to move to
            const yCoord = lineItem ? lineItem?.getBoundingClientRect().top + window.scrollY - yOffset : 0;
            window.scrollTo({top: yCoord});
        }

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