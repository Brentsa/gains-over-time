import { faSave } from "@fortawesome/free-solid-svg-icons";
import {ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import Button from "../buttons/Button";
import { ExerciseFromSWR } from "../tables/ExerciseTable"
import FormInput from "./FormInput"

interface Props {
    exercise: ExerciseFromSWR | undefined
    close: () => void; 
}

interface Inputs {
    quantity: number,
    weight: number
}

export default function AddSetForm({exercise, close}: Props){

    const [inputs, setInputs] = useState<Inputs>({quantity: 0, weight: 0});

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = event.target;
    
        //update input state with the changed variable and leave the rest as is
        setInputs(prevState => ({...prevState, [name]: value}));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        console.log(inputs);

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