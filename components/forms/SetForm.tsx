import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, FormEventHandler } from "react";
import Button from "../buttons/Button";
import { ExerciseFromSWR } from "../tables/ExerciseTable";
import { SetInputs } from "./AddSetForm";
import FormInput from "./FormInput"

interface Props {
    inputs: SetInputs,
    exercise: ExerciseFromSWR,
    handleSubmit: FormEventHandler<HTMLFormElement>,
    handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export default function SetForm({inputs, exercise, handleSubmit, handleInputChange}: Props){

    return (
        <form onSubmit={handleSubmit} className="w-10/12">
            <div className="space-y-2 mb-4">
                <FormInput
                    id="quantity"
                    name="quantity"
                    label={exercise.exerciseT.type === "seconds" ? "Seconds:" : "Quantity:"}
                    value={inputs.quantity}
                    className="w-full"
                    onChange={handleInputChange}
                    type="number"
                    min={0}
                />
                {exercise.exerciseT.type === 'lbs' &&
                    <FormInput
                        id="weight"
                        name="weight"
                        label="Weight:"
                        value={inputs.weight}
                        className="w-full"
                        onChange={handleInputChange}
                        type="number"
                        min={0}
                    />
                }
            </div>
            <Button 
                icon={faSave} 
                type="submit" 
                label="Save" 
                className="w-full" 
                disabled={exercise.exerciseT.type === 'lbs' ? !inputs.weight || !inputs.quantity : !inputs.quantity}
            />
        </form>
    );
}