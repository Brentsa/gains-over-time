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
        <form className="flex items-center justify-start w-full">
            <div className="w-1/4">
                <label htmlFor="exercise-name" className="sr-only">
                    Exercise Name
                </label>
                <input
                    id="exercise-name"
                    name="name"
                    value={inputs.name}
                    onChange={handleInputChange}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-20 z-10 sm:text-sm"
                    placeholder="Exercise Name"
                />
            </div>
        </form>
    )
}