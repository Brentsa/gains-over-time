import { ChangeEvent, MouseEvent, useState } from "react"
import { Muscle } from "@prisma/client";
import { Props } from '../../pages/index'
import MuscleSelect from "./MuscleSelect"

type Inputs = {
    name: string,
    muscles: string[]
    targetSets: number | '',
    targetReps: number | '',
    type: 'lbs' | 'seconds' | ''
}

export default function CreateExerciseForm({user}: Props){

    const [inputs, setInputs] = useState<Inputs>({name: '', muscles: [], targetSets: '', targetReps: '', type: ''});

    const [selectedMuscle, setSelectedMuscle] = useState<Omit<Muscle, 'createdAt'>>({id: 0, name: ''});
    const [muscleArray, setMuscleArray] = useState<Omit<Muscle, 'createdAt'>[]>([])

    function handleInputSelectChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const name = event.target.name;
        const value = event.target.value;

        setInputs({ ...inputs, [name]: value});
    }

    function addMuscle(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        console.log(selectedMuscle);
    }

    return (
        <form className="pl-4 grid gap-y-3">
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
                <div className="w-80">
                    <MuscleSelect 
                        value={selectedMuscle}
                        setSelectedMuscle={setSelectedMuscle}
                        addMuscle={addMuscle}
                    />
                </div>
            </div>
        </form>
    )
}