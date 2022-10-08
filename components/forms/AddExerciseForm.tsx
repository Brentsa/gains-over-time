

import { Props } from '../../pages/index'
import ExerciseTemplateSelect from "./ExerciseTemplateSelect";

export default function AddExerciseForm({user}: Props){

    if(!user?.id) return <div>Error loading exercises.</div>

    return (
        <form>
            <ExerciseTemplateSelect id={user.id}/>
        </form>
    )
}