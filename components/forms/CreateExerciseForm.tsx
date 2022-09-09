import { ChangeEvent, useState } from "react"

type Inputs = {
    name: string,
    muscles: string[]
    type: number
}

export default function CreateExerciseForm(){

    const [inputs, setInputs] = useState<Inputs>({name: '', muscles: [], type: 0});

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        const name = event.target.name;
        const value = event.target.value;

        setInputs({ ...inputs, [name]: value});
    }

    return (
        <div>
            <div>
                <label htmlFor="exercise-name" className="sr-only">
                    Exercise Name
                </label>
                <input
                    id="exercise-name"
                    name="name"
                    value={inputs.name}
                    onChange={handleInputChange}
                    className="appearance-none rounded relative block w-1/4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-20 z-10 sm:text-sm"
                    placeholder="Exercise Name"
                />
            </div>
        </div>
    )
}