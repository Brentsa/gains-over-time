import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Set } from "@prisma/client";
import { ChangeEvent, Dispatch, FormEvent, FormEventHandler, SetStateAction, useState } from "react";
import Button from "../buttons/Button";
import { ExerciseFromSWR } from "../tables/ExerciseTable";
import FormInput from "./FormInput";

interface Props {
    set: Set,
    exercise: ExerciseFromSWR,
    closeModal: () => void,
    setSets: Dispatch<SetStateAction<Set[]>>
}

interface Inputs {
    quantity: number | '', 
    weight: number | ''
}

export default function UpdateSetForm({set, exercise, closeModal, setSets}: Props){

    const [inputs, setInputs] = useState<Inputs>({quantity: set.quantity, weight: set.weight});

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        event.preventDefault();

        //destructure the name and value from the changed input
        const {name, value} = event.target;
        setInputs(prevInputs => ({...prevInputs, [name]: !value ? value : parseInt(value) }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        //Weight is always required, if the exercise is weight type there has to be a quantity as well
        if(!inputs.weight || (exercise.exerciseT.type === 'lbs' && !inputs.quantity)) return; 

        const response = await fetch(`api/set/update/${set.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputs)
        });

        //if the response is not ok break out of the function
        if(!response.ok) return;

        const updatedSet:Set = await response.json();

        //close the modal and reset the selected set
        closeModal();

        //update the entire set state in the exercise table with the updated set
        setSets(prevSets => prevSets.map(prevSet => prevSet.id === set.id ? {...updatedSet} : prevSet));
    }

    return (
        <div className="w-8/12 flex flex-col justify-around items-center">
            <h2 className="font-bold w-full mb-2 text-sm sm:text-lg lg:text-xl border-b-2 border-violet-300">
                Update Set
            </h2>
            <form onSubmit={handleSubmit} className="w-10/12">
                <div className="space-y-2 mb-4">
                    {exercise.exerciseT.type !== 'seconds' &&
                        <FormInput
                            id="quantity"
                            name="quantity"
                            label="Quantity:"
                            value={inputs.quantity}
                            className="w-full"
                            onChange={handleInputChange}
                            type="number"
                            min={0}
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
                        min={0}
                    />
                </div>
                <Button 
                    icon={faSave} 
                    type="submit" 
                    label="Save" 
                    className="w-full" 
                    disabled={exercise.exerciseT.type !== 'seconds' ? !inputs.weight || !inputs.quantity : !inputs.weight}
                />
            </form>
        </div>
    );
}