import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Props } from '../../pages/index'
import FormInput from "./FormInput"
import MuscleSelect from "./MuscleSelect"

export interface Inputs {
    name: string,
    muscles: number[]
    targetSets: number | '',
    targetReps: number | '',
    type: 'lbs' | 'seconds' | ''
}

interface FormFeedback {
    type: 'success' | 'failure' | '',
    message: string
}

export default function CreateExerciseTForm({user}: Props){

    const [inputs, setInputs] = useState<Inputs>({name: '', muscles: [], targetSets: '', targetReps: '', type: ''});
    const [feedback, setFeedback] = useState<FormFeedback>({type: '', message: ''});
    const [resetMuscleSelect, setResetMuscleSelect] = useState<boolean>(false);

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

        if(!response.ok){
            return setFeedback({type: 'failure', message: 'Exercise template creation was unsuccessful.'});
        }

        const data = await response.json();

        //set a feedback success message, reset the form inputs, and trigger a reset for the muscle select component
        setFeedback({type: 'success', message: `${data.name} exercise template created!`});
        setInputs({name: '', muscles: [], targetSets: '', targetReps: '', type: ''});
        setResetMuscleSelect(true);
    }

    useEffect(() => {
        if(!feedback.type) return; 

        //if there is feedback set, reset it after 5 seconds
        setTimeout(() => {
            setFeedback({type: '', message: ''});
        }, 5000);
    }, [feedback.type])

    return (
        <form className="grid grid-cols-1 pl-2 lg:pl-4 gap-y-3" onSubmit={submitForm}>
            <div className="flex flex-wrap justify-between md:justify-start items-center col-span-12 pb-2 space-x-4 border-b-2 border-violet-300">
                <h2 className="font-bold text-sm sm:text-lg lg:text-xl">
                    Exercise Template
                </h2>
                <button type="submit" className='rounded bg-rose-500 text-white p-1 hover:bg-rose-400 px-4'>
                    Create
                </button>
                {feedback.type &&
                    <h2 className={`font-bold text-lg ${feedback.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {feedback.message}
                    </h2>
                }
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
                    </select>
                </div>
            </div>

            <div className="col-span-12 flex space-x-4">
                <MuscleSelect setInputs={setInputs} reset={resetMuscleSelect} resetFunction={setResetMuscleSelect}/>
            </div>
        </form>
    )
}