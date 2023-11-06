import useSWR from "swr";
import ExerciseDropdownList from "../utilities/ExerciseDropdownList";
import { ExerciseTemplate } from "@prisma/client";
import fetcher from "../../utils/swrFetcher";
import { userContext } from "../../pages";
import { useContext, useState } from "react";
import Button from "../buttons/Button";

export default function ChangeExerciseForm(){

    const {user} = useContext(userContext);

    const {data, error} = useSWR<ExerciseTemplate[]>(`api/exercise-templates/${user?.id}`, fetcher);

    const [selectedExercise, setSelectedExercise] = useState<ExerciseTemplate | undefined>(undefined);

    if(!data){
        return <div>error</div>
    }

    return (
        <form className="p-2 space-y-2 w-full">
            <ExerciseDropdownList
                className="w-full"
                dropdownItems={data}
                state={selectedExercise}
                updateState={setSelectedExercise}
            />
            <Button
                label="Change" 
            />
        </form>
    )
}