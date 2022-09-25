import { ChangeEvent, useState } from "react"
import { Account } from '@prisma/client'
import { Props } from '../../pages/index'

type Inputs = {
    name: string,
    muscles: string[]
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

    return (
        <form className="flex items-center justify-start w-full space-x-4">
            <div className="w-1/6">
                <label htmlFor="exercise-name">
                    Exercise Name:
                </label>
                <input
                    id="exercise-name"
                    name="name"
                    value={inputs.name}
                    onChange={handleInputSelectChange}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-20 z-10 sm:text-sm"
                    placeholder="Enter exercise name"
                    type="text"
                />
            </div>

            {/* <div className="w-1/4">
                <label htmlFor="exercise-name">
                    Muscles
                </label>
                <select
                    id="exercise-name"
                    name="name"
                    value={inputs.name}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-20 z-10 sm:text-sm"
                    placeholder="Exercise Name"
                    multiple
                >
                    <option>Hello</option>
                    <option>World</option>
                    <option>What up</option>
                </select>
            </div> */}

            <div className="w-1/6">
                <label htmlFor="exercise-targetSets">
                    Target Sets:
                </label>
                <input
                    id="exercise-targetSets"
                    name="targetSets"
                    value={inputs.targetSets}
                    onChange={handleInputSelectChange}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-20 z-10 sm:text-sm"
                    placeholder="Enter target number of sets"
                    type='number'
                    min={1}
                    required
                />
            </div>

            <div className="w-1/6">
                <label htmlFor="exercise-targetReps">
                    Target Reps:
                </label>
                <input
                    id="exercise-targetReps"
                    name="targetReps"
                    value={inputs.targetReps}
                    onChange={handleInputSelectChange}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-20 z-10 sm:text-sm"
                    placeholder="Enter target number of reps"
                    type='number'
                    min={1}
                    required
                />
            </div>

            <div className="w-1/6">
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
        </form>
    )
}