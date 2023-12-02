import useSWR, { mutate } from "swr";
import ExerciseDropdownList from "../utilities/ExerciseDropdownList";
import { ExerciseTemplate } from "@prisma/client";
import fetcher from "../../utils/swrFetcher";
import { userContext } from "../../pages";
import { FormEvent, useContext, useState } from "react";
import Button from "../buttons/Button";
import { ExerciseFromSWR } from "../tables/ExerciseTable";
import { feedbackContext } from "../MainPageContainer";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface Props {
    exercise: ExerciseFromSWR,
    closeModal: () => void,
}

export default function ChangeExerciseForm({exercise, closeModal}: Props){

    //get user and feedback context
    const {user} = useContext(userContext);
    const {setFeedback} = useContext(feedbackContext);

    //pull exercise templates for the exercise dropdown list
    const {data, error} = useSWR<ExerciseTemplate[]>(`api/exercise-templates/${user?.id}`, fetcher);

    const [selectedExercise, setSelectedExercise] = useState<ExerciseTemplate | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    //called when the form has been submitted
    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        //if there is no selected exercise or user, break out of the sumbit
        if(!selectedExercise || !user) return; 

        setLoading(true); 

        //call api to update the exercise template of the supplied exercise start loading before call and stop laoding once complete
        const response = await fetch(`api/exercise/update/${exercise.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({exerciseTId: selectedExercise.id})
        })

        setLoading(false);

        //if the response is not ok, present the user with an error feedback message
        if(!response.ok) return setFeedback({type: 'failure', message: 'Exercise was not updated'});

        //update the user's exercise on success
        mutate(`api/exercises/${user?.id}`);

        closeModal();

        //notify the user that the update was successful
        setFeedback({type: 'success', message: 'Exercise was updated successfully.'});
    }

    if(!data || error){
        return <div>error</div>
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="px-2 py-4 space-y-2 w-screen"
        >
            <ExerciseDropdownList
                className="w-full"
                dropdownItems={data}
                state={selectedExercise}
                updateState={setSelectedExercise}
            />
            <Button
                label="Change" 
                type="submit"
                disabled={!selectedExercise}
                loading={loading}
            />
        </form>
    )
}