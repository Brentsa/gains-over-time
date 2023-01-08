import { Set } from "@prisma/client";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { ExerciseFromSWR } from "../tables/ExerciseTable";
import { SetInputs } from "./AddSetForm";
import SetForm from "./SetForm";

interface Props {
    set: Set,
    exercise: ExerciseFromSWR,
    closeModal: () => void,
    setSets: Dispatch<SetStateAction<Set[]>>
}

export default function UpdateSetForm({set, exercise, closeModal, setSets}: Props){

    const [inputs, setInputs] = useState<SetInputs>({quantity: set.quantity, weight: set.weight});

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        event.preventDefault();

        //destructure the name and value from the changed input
        const {name, value} = event.target;
        setInputs(prevInputs => ({...prevInputs, [name]: !value ? value : parseInt(value) }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        //Quantity is always required, if the exercise is lbs type there has to be a weight
        if(!inputs.quantity || (exercise.exerciseT.type === 'lbs' && !inputs.weight)) return; 

        const response = await fetch(`api/set/update/${set.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputs)
        });

        //if the response is not ok break out of the function
        if(!response.ok) return;

        const updatedSet:Set = await response.json();

        //update the entire set state in the exercise table with the updated set
        setSets(prevSets => prevSets.map(prevSet => prevSet.id === set.id ? {...updatedSet} : prevSet));

        //close the modal and reset the selected set
        closeModal(); 
    }

    return (
        <div className="w-8/12 flex flex-col justify-around items-center">
            <h2 className="font-bold w-full mb-2 text-sm sm:text-lg lg:text-xl border-b-2 border-violet-300">
                Update Set
            </h2>
            <SetForm exercise={exercise} inputs={inputs} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
        </div>
    );
}