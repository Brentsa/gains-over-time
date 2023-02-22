import { FormEventHandler, MouseEvent } from "react";
import Button from "../buttons/Button";

interface Props {
    closeForm: () => void
    deleteExercise: () => Promise<void>
}

export default function ExerciseDeleteForm({deleteExercise, closeForm}: Props){

    async function handleFormSubmit(event: MouseEvent<HTMLFormElement>){
        event.preventDefault();
        await deleteExercise();
        closeForm();
    }

    return (
        <form 
            onSubmit={handleFormSubmit}
            className="w-4/6 flex flex-col justify-around items-center"
        >
            <p className="my-4 sm:text-lg text-center">
                Are you sure you want to delete this exercise and all of it&apos;s data?
            </p>
            <Button label="Yes, Delete Exercise" type="submit"></Button>
        </form>
    )
}