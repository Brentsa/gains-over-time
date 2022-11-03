import { faSave } from "@fortawesome/free-solid-svg-icons";
import {useState } from "react";
import Button from "../buttons/Button";
import { ExerciseFromSWR } from "../tables/ExerciseTable"
import FormInput from "./FormInput"

interface Props {
    exercise: ExerciseFromSWR | undefined
}

interface Inputs {
    quantity: number,
    weight: number
}

export default function AddSetForm({exercise}: Props){

    const [inputs, setInputs] = useState<Inputs>({quantity: 0, weight: 0});
    

    return exercise ? (
        <div className="flex flex-col justify-around items-center">
            <h2 className="font-bold w-full text-sm sm:text-lg lg:text-xl border-b-2 border-violet-300">
                Add New Set
            </h2>
            <form className="space-y-4">
                <div>
                    <FormInput
                        id="quantity"
                        name="quantity"
                        label="Quantity:"
                        value={inputs.quantity}
                        className="w-full"
                        onChange={() => {}}
                        type="number"
                    />
                    <FormInput
                        id="weight"
                        name="weight"
                        label="Weight:"
                        value={inputs.weight}
                        className="w-full"
                        onChange={() => {}}
                        type="number"
                    />
                </div>
                <Button icon={faSave} type="submit" label="Save" className="w-full"/>
            </form>
        </div>
    ) : 
    <div>Form could not load.</div>
}