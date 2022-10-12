import { Exercise } from "@prisma/client";
import useSWR from "swr";
import { Props } from "../../pages";
import fetcher from "../../utils/swrFetcher";
import ExerciseTableRow from "./ExerciseTableRow";
import { ExerciseTemplate, Set } from "@prisma/client";

export interface ExerciseFromSWR{
    id: number,
    accountId: number,
    exerciseTId: number,
    createdAt: string,
    exerciseT: Omit<ExerciseTemplate, 'createdAt' | 'accountId'>,
    sets: Pick<Set, 'id'>[]
}

export default function ExerciseTable({user}: Props){

    //fetch all of the user's exercises using their ID
    const {data, error} = useSWR<ExerciseFromSWR[]>(`api/exercises/${user?.id}`, fetcher);

    if(!data || error) return <div>Exercises could not load.</div>

    return (
        <ul>
            {data.map((exercise, i) => <ExerciseTableRow key={i} exercise={exercise}/>)}
        </ul>
    );
}