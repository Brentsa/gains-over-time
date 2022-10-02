import { ChangeEvent, FormEvent, useState } from "react"
import { Props } from '../../pages/index'
import MuscleSelect from "./MuscleSelect"

export interface Inputs {
    name: string,
    muscles: number[]
    targetSets: number | '',
    targetReps: number | '',
    type: 'lbs' | 'seconds' | ''
}

export default function CreateExerciseForm({user}: Props){

    const [inputs, setInputs] = useState<Inputs>({name: '', muscles: [], targetSets: '', targetReps: '', type: ''});

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

        const data = await response.json();

        if(!response.ok) return console.log(data);

        console.log(data);
        setInputs({name: '', muscles: [], targetSets: '', targetReps: '', type: ''});
    }

    return (
        <form className="pl-4 grid gap-y-3" onSubmit={submitForm}>
            <div className="col-span-12 flex flex-wrap space-x-4">
                <div className="w-96">
                    <label htmlFor="exercise-name">
                        Exercise Name:
                    </label>
                    <input
                        id="exercise-name"
                        name="name"
                        value={inputs.name}
                        onChange={handleInputSelectChange}
                        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-20 z-10 sm:text-sm"
                        placeholder="e.g. Bench Press"
                        type="text"
                    />
                </div>

                <div className="w-40">
                    <label htmlFor="exercise-targetSets">
                        Target Sets:
                    </label>
                    <input
                        id="exercise-targetSets"
                        name="targetSets"
                        value={inputs.targetSets}
                        onChange={handleInputSelectChange}
                        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-20 z-10 sm:text-sm"
                        placeholder="e.g. 3"
                        type='number'
                        min={1}
                        required
                    />
                </div>

                <div className="w-40">
                    <label htmlFor="exercise-targetReps">
                        Target Reps:
                    </label>
                    <input
                        id="exercise-targetReps"
                        name="targetReps"
                        value={inputs.targetReps}
                        onChange={handleInputSelectChange}
                        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-20 z-10 sm:text-sm"
                        placeholder="e.g. 10"
                        type='number'
                        min={1}
                        required
                    />
                </div>

                <div className="w-40">
                    <label htmlFor="exercise-repType">
                        Rep Type:
                    </label>
                    <select
                        id="exercise-repType"
                        name="type"
                        value={inputs.type}
                        onChange={handleInputSelectChange}
                        className={`rounded relative block w-full px-3 py-2 border border-gray-300 ${!inputs.type ? "text-gray-500": "text-gray-900"} focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-20 z-10 sm:text-sm`}
                        required
                    >
                        <option defaultValue='' disabled={!!inputs.type}>Select Rep Type</option>
                        <option value="lbs">Pounds</option>
                        <option value="seconds">Seconds</option>
                    </select>
                </div>
            </div>

            <div className="col-span-12 flex space-x-4">
                <MuscleSelect setInputs={setInputs}/>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}