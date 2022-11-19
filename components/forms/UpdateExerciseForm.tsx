import { BasicSet } from "../tables/ExerciseTableRow";

interface Props {
    set: BasicSet | null
}

export default function UpdateExerciseForm({set}: Props){
    console.log(set);
    return set ? (
        <div className="text-black">
            WOWOWOWOW
        </div>
    ): <></>;
}