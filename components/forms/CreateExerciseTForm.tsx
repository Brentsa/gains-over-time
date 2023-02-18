import { RepType } from "@prisma/client"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { mutate } from "swr"
import { userContext } from '../../pages/index'
import { capitalizeAllWords } from "../../utils/helpers"
import { feedbackContext } from "../MainPageContent"
import FormInput from "./FormInput"
import MuscleSelect from "./MuscleSelect"

export interface Inputs {
    name: string,
    muscles: number[]
    targetSets: number | '',
    targetReps: number | '',
    type: RepType | ''
}

export default function CreateExerciseTForm(){

    const user = useContext(userContext);
    const {setFeedback} = useContext(feedbackContext);

    const [inputs, setInputs] = useState<Inputs>({name: '', muscles: [], targetSets: '', targetReps: '', type: ''});
    const [resetMuscleSelect, setResetMuscleSelect] = useState<boolean>(false);

    //update the input state of the name and value in the form
    function handleInputSelectChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const name = event.target.name;
        const value = event.target.value;
        
        setInputs({ ...inputs, [name]: value});
    }

    async function submitForm(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const createBody = {
            ...inputs, 
            accountId: user?.id, 
            name: inputs.name.trim().toLowerCase(),
            targetSets: parseInt(inputs.targetSets as string), 
            targetReps: parseInt(inputs.targetReps as string)
        };

        const response = await fetch('/api/exercise-template/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createBody)
        })

        //if the response is not ok, present the user with an error feedback message
        if(!response.ok) return setFeedback({type: 'failure', message: 'Template could not be created'});

        const data = await response.json();

        //set a feedback success message, reset the form inputs, and trigger a reset for the muscle select component
        setInputs({name: '', muscles: [], targetSets: '', targetReps: '', type: ''});
        setResetMuscleSelect(true);

        //update the add exercise select list when a new template is created
        mutate(`api/exercise-templates/${user?.id}`);

        //set a successful feedback message
        setFeedback({type: 'success', message: `${capitalizeAllWords(data.name)} template created!`});
    }

    return (
        <form className="grid grid-cols-1 pl-2 lg:pl-4 gap-y-3" onSubmit={submitForm}>
            <div className="flex flex-wrap justify-between md:justify-start items-center col-span-12 pb-2 space-x-4 border-b-2 border-violet-300">
                <h2 className="font-bold text-sm sm:text-lg lg:text-xl">
                    Exercise Template
                </h2>
                <button 
                    type="submit" 
                    className='rounded px-4 bg-rose-500 text-white p-1 hover:bg-rose-400 disabled:bg-gray-300'
                    disabled={!inputs.name || !inputs.targetReps || !inputs.targetSets || !inputs.type}
                >
                    Create
                </button>
            </div>

            <div className="grid grid-cols-12 gap-x-4 gap-y-2">
                <FormInput
                    id="exercise-name"
                    name="name"
                    value={inputs.name}
                    onChange={handleInputSelectChange}
                    className="col-span-full"
                    label="Exercise Name:"
                    placeholder="e.g. Bench Press"
                    required
                />

                <FormInput
                    id="exercise-targetSets"
                    name="targetSets"
                    value={inputs.targetSets}
                    onChange={handleInputSelectChange}
                    className="col-span-full"
                    label="Target Sets:"
                    placeholder="e.g. 3"
                    type='number'
                    min={1}
                    required
                />

                <FormInput
                    id="exercise-targetReps"
                    name="targetReps"
                    value={inputs.targetReps}
                    onChange={handleInputSelectChange}
                    className="col-span-full"
                    label="Target Reps:"
                    placeholder="e.g. 10"
                    type='number'
                    min={1}
                    required
                />

                <div className="col-span-full">
                    <label htmlFor="exercise-repType" className="text-sm">
                        Rep Type:
                    </label>
                    <select
                        id="exercise-repType"
                        name="type"
                        value={inputs.type}
                        onChange={handleInputSelectChange}
                        className={`rounded relative block w-full px-3 py-2 border border-gray-300 ${!inputs.type ? "text-gray-500": "text-gray-900"} focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10 sm:text-sm`}
                        required
                    >
                        <option defaultValue='' disabled={!!inputs.type}>Select Rep Type</option>
                        <option value="lbs">Pounds</option>
                        <option value="seconds">Seconds</option>
                        <option value="bodyWeight">Body Weight</option>
                        <option value='levels'>Levels</option>
                    </select>
                </div>
            </div>

            <div className="col-span-12 flex space-x-4">
                <MuscleSelect setInputs={setInputs} reset={resetMuscleSelect} resetFunction={setResetMuscleSelect}/>
            </div>
        </form>
    )
}