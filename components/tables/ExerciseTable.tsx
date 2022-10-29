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
    exerciseT: ExerciseTemplate,
    sets: Set[]
}

export default function ExerciseTable({user}: Props){

    //fetch all of the user's exercises using their ID
    const {data, error} = useSWR<ExerciseFromSWR[]>(`api/exercises/${user?.id}`, fetcher);

    console.log(data);

    if(!data || error) return <div>Exercises could not load.</div>

    return (
        <div>
            <div className='w-full h-0.5 bg-gradient-to-r from-rose-400 via-violet-400 to-rose-400'/>
            <ul>
                {data.map((exercise, i) => <ExerciseTableRow key={i} exercise={exercise}/>)}
            </ul> 
        </div>  
    );
}