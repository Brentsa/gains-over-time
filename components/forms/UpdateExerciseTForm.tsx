import { Muscle, Prisma } from "@prisma/client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import useSWR from "swr"
import { Props } from '../../pages/index'
import { Inputs } from "./CreateExerciseTForm"
import FormInput from "./FormInput"
import MuscleSelect from "./MuscleSelect"

interface FormFeedback {
    type: 'success' | 'failure' | '',
    message: string
}

//create a type safe object of exercise template with muscles included
const exerciseTemplateWithMuscles = Prisma.validator<Prisma.ExerciseTemplateArgs>()({
    include: {muscles: true}
})

//define the exercise template with muscles type using prisma get payload
export type ExerciseTemplateWithMuscles = Prisma.ExerciseTemplateGetPayload<typeof exerciseTemplateWithMuscles>;

export default function UpdateExerciseTForm({user}: Props){

    //retrieve the user's exercise templates
    const {data: exerciseTemplates} = useSWR<ExerciseTemplateWithMuscles[]>(`api/exercise-templates/${user?.id}`);

    const [selectedExerciseTId, setSelectedExerciseTId] = useState(0);
    const [muscleArray, setMuscleArray] = useState<Omit<Muscle, 'createdAt'>[]>([])

    const [inputs, setInputs] = useState<Inputs>({name: '', muscles: [], targetSets: '', targetReps: '', type: ''});
    const [feedback, setFeedback] = useState<FormFeedback>({type: '', message: ''});
    const [resetSelect, setResetSelect] = useState<boolean>(false);

    function handleExerciseTSelect(event: ChangeEvent<HTMLSelectElement>): void {
        setSelectedExerciseTId(parseInt(event.target.value));
    }

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

        console.log(createBody);

        // const response = await fetch('/api/exercise-template/create', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(createBody)
        // })

        // if(!response.ok){
        //     return setFeedback({type: 'failure', message: 'Exercise template creation was unsuccessful.'});
        // }

        // const data = await response.json();

        // //set a feedback success message, reset the form inputs, and trigger a reset for the muscle select component
        // setFeedback({type: 'success', message: `${data.name} exercise template created!`});
        // setInputs({name: '', muscles: [], targetSets: '', targetReps: '', type: ''});
        // setResetSelect(true);
    }

    useEffect(() => {
        if(!feedback.type) return; 

        //if there is feedback set, reset it after 5 seconds
        setTimeout(() => {
            setFeedback({type: '', message: ''});
        }, 5000);
    }, [feedback.type]);

    useEffect(()=>{
        //exit the function if the templates haven't loaded or if there is no selected template
        if(!exerciseTemplates || !selectedExerciseTId ) return;
        
        for(let i = 0; i < exerciseTemplates.length; i++){
            if(exerciseTemplates[i].id === selectedExerciseTId){
                //update the muscle array with muscle ids and names
                setMuscleArray(exerciseTemplates[i].muscles.map(muscle => ({id: muscle.id, name: muscle.name})));

                //set the user input fields with the data from the selected exercise template
                return setInputs({
                    name: exerciseTemplates[i].name,
                    type: exerciseTemplates[i].type,
                    targetReps: exerciseTemplates[i].targetReps, 
                    targetSets: exerciseTemplates[i].targetSets,
                    muscles: exerciseTemplates[i].muscles.map(muscle => muscle.id)
                });
            }
        }
    }, [exerciseTemplates, selectedExerciseTId])

    return (
        <form className="grid grid-cols-1 pl-2 lg:pl-4 gap-y-3" onSubmit={submitForm}>
            <div className="flex flex-wrap justify-between md:justify-start items-center col-span-12 pb-2 space-x-4 border-b-2 border-violet-300">
                <h2 className="font-bold text-sm sm:text-lg lg:text-xl">
                    Exercise Template
                </h2>
                <button type="submit" className='rounded bg-rose-500 text-white p-1 hover:bg-rose-400 px-4'>
                    Update
                </button>
                {feedback.type &&
                    <h2 className={`font-bold text-lg ${feedback.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {feedback.message}
                    </h2>
                }
            </div>

            <div className="grid grid-cols-12 gap-x-4 gap-y-2">
                
                <div className="col-span-full">
                    <label htmlFor="exerciseT-select" className="text-sm">
                        Select Exercise:
                    </label>
                    <select 
                        id="exerciseT-select"
                        className="rounded relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10 sm:text-sm"
                        name="exerciseT"
                        onChange={handleExerciseTSelect}
                        value={selectedExerciseTId}
                        disabled={!exerciseTemplates}
                    >
                        <option value={0}>Select Exercise Template</option>
                        {exerciseTemplates && exerciseTemplates?.length > 0 &&
                            exerciseTemplates.map((template, id) => <option value={template.id} key={id}>{template.name}</option>)
                        }
                    </select>
                </div>
                
                <FormInput
                    id="exercise-name"
                    name="name"
                    value={inputs.name}
                    onChange={handleInputSelectChange}
                    className="col-span-full"
                    label="Exercise Name:"
                    type="text"
                    required
                    disabled={!selectedExerciseTId}
                />

                <FormInput
                    id="exercise-targetSets"
                    name="targetSets"
                    value={inputs.targetSets}
                    onChange={handleInputSelectChange}
                    className="col-span-full"
                    label="Target Sets:"
                    type='text'
                    min={1}
                    required
                    disabled={!selectedExerciseTId}
                />

                <FormInput
                    id="exercise-targetReps"
                    name="targetReps"
                    value={inputs.targetReps}
                    onChange={handleInputSelectChange}
                    className="col-span-full"
                    label="Target Reps:"
                    type='number'
                    min={1}
                    required
                    disabled={!selectedExerciseTId}
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
                        disabled={!selectedExerciseTId}
                    >
                        <option defaultValue='' disabled={!!inputs.type}>Select Rep Type</option>
                        <option value="lbs">Pounds</option>
                        <option value="seconds">Seconds</option>
                    </select>
                </div>
            </div>

            <div className="col-span-12 flex space-x-4">
                <MuscleSelect 
                    setInputs={setInputs} 
                    reset={resetSelect} 
                    resetFunction={setResetSelect} 
                    disabled={!selectedExerciseTId} 
                    initialMuscles={muscleArray}
                />
            </div>
        </form>
    )
}