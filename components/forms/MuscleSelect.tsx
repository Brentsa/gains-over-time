import useSWR from "swr";
import fetcher from "../../utils/swrFetcher";
import { Muscle } from "@prisma/client";
import { capitalizeAllWords } from "../../utils/helpers";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { Inputs } from "./CreateExerciseTForm";
import PillButton from "../buttons/PillButton";
import MuscleDropdownList from "../utilities/MuscleDropdownList";

interface Props {
    setInputs: Dispatch<SetStateAction<Inputs>>,
    reset: boolean,
    resetFunction: Dispatch<SetStateAction<boolean>>,
    disabled?: boolean
    initialMuscles?: Omit<Muscle, 'createdAt'>[]
}

export default function MuscleSelect({setInputs, reset, resetFunction, initialMuscles, disabled}: Props){

    //fetch muscles from the database
    const {data, error} = useSWR<Muscle[]>('/api/muscles', fetcher);

    //state to hold the currently selected muscles
    const [selectedMuscles, setSelectedMuscles] = useState<Omit<Muscle, "createdAt">[]>([]);

    useEffect(() => {
        //whenever the muscle array changes, update the inputs state's muscles array with only the muscle IDs
        setInputs(prevState => ({...prevState, muscles: selectedMuscles.map(muscle => muscle.id)}));
    }, [setInputs, selectedMuscles]);

    useEffect(() => {
        //if initial muscles is supplied, updated the muscle array to display the muscles
        if(initialMuscles) return setSelectedMuscles(initialMuscles);
    }, [initialMuscles]);

    useEffect(() => {
        //if the supplied reset variable is true, reset the state of the entire component and flip the reset state to false
        if(reset){
            resetFunction(false);
            setSelectedMuscles([]);
        }
    }, [reset, resetFunction]);

    if(error) return <div>Could not load muscles.</div>

    if(!data) return <div>loading...</div> 

    return (
        <div className="w-full">
            <label htmlFor="exercise-muscle-select" className="text-sm">
                Muscle Groups:
            </label>
            <div className="grid grid-cols-12 gap-x-4">
                <div className="col-span-full flex w-full" style={{maxHeight: 38}}>
                    <MuscleDropdownList dropdownItems={data} selectedMuscles={selectedMuscles} setSelectedMuscles={setSelectedMuscles} disabled={disabled}/>
                </div>
                {selectedMuscles.length > 0 &&
                    <div className="col-span-full flex flex-wrap items-center bg-gray-100 border border-gray-300 border-t-0 rounded-b-lg p-1">
                        {selectedMuscles.map((muscle, id) => (
                            <div key={id} className='p-1 h-10'>
                                <PillButton label={muscle.name} id={muscle.id} setArray={setSelectedMuscles}/>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}