import useSWR from "swr";
import fetcher from "../../utils/swrFetcher";
import { Muscle } from "@prisma/client";
import { firstLetterToUpperCase } from "../../utils/helpers";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { Inputs } from "./CreateExerciseForm";
import PillButton from "../buttons/PillButton";

interface Props {
    setInputs: Dispatch<SetStateAction<Inputs>>
}

export default function MuscleSelect({setInputs}: Props){

    //fetch muscles from the database
    const {data, error} = useSWR<Muscle[]>('/api/muscles', fetcher);

    const [selectedMuscle, setSelectedMuscle] = useState<Omit<Muscle, 'createdAt'>>({id: 0, name: ''});
    const [muscleArray, setMuscleArray] = useState<Omit<Muscle, 'createdAt'>[]>([])

    //called when the select drop down changes
    function handleChange(event: ChangeEvent<HTMLSelectElement>){
        if(!data) return; 

        //store the id of the selected muscle
        const muscleId: number = parseInt(event.target.value);

        //instantiate an empty string to contain the muscle name
        let muscleName = '';

        //find the associated muscle name using the muscle id from the data
        for(let i = 0; i < data.length; i++){
            if(data[i].id === muscleId){
                muscleName = data[i].name;
                break;
            }
        }

        setSelectedMuscle({id: muscleId, name: muscleName});
    }

    function addMuscle(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        setMuscleArray( prevArray => prevArray.concat(selectedMuscle));
    }

    useEffect(()=> {
        //whenever the muscle array changes, update the inputs state's muscles array with only the muscle IDs
        setInputs(prevState => ({...prevState, muscles: muscleArray.map(muscle => muscle.id)}));
    }, [setInputs, muscleArray]);

    if(error) return <div>Could not load muscles.</div>

    return (
        <div className="w-full">
            <label htmlFor="exercise-repType">
                Add Muscles:
            </label>
            {!data ?
                <div>loading...</div> 
                :
                <div className="flex">
                    <div className="flex w-80">
                        <select
                            id="exercise-repType"
                            name="type"
                            onChange={handleChange}
                            className={`rounded-l relative block w-full px-3 py-2 border border-gray-300 ${!selectedMuscle.id ? "text-gray-500": "text-gray-900"} focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-20 z-10 sm:text-sm`}
                            required
                        >   
                            <option defaultValue=''>Select Muscle</option>
                            {data.map((muscle, id) => <option value={muscle.id} key={id} label={firstLetterToUpperCase(muscle.name)}/>)}
                        </select>
                        <button 
                            className='rounded-r bg-amber-500 text-white p-1 hover:bg-amber-400 px-4 disabled:bg-gray-300' 
                            onClick={addMuscle}
                            disabled={!selectedMuscle.id}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    <div className="flex flex-wrap px-4 space-x-2">
                        {muscleArray.map((muscle, id) => <PillButton key={id} label={muscle.name} id={muscle.id} setArray={setMuscleArray}/>)}
                    </div>
                </div>
            }
        </div>
    )
}