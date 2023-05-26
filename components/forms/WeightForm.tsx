import FormInput from "./FormInput";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Button from "../buttons/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../../pages";
import { Weight } from "@prisma/client";
import { feedbackContext } from "../MainPageContainer";
import { KeyedMutator } from "swr";

interface Inputs{
    weight: number | '',
    massUnit: 'lbs' | 'kg'
}

interface Props{
    mutate: KeyedMutator<Weight[]>
}

export default function WeightForm({mutate}: Props){

    const {user} = useContext(userContext);
    const {setFeedback} = useContext(feedbackContext);

    const [inputs, setInputs] = useState<Inputs>({weight: '', massUnit: 'lbs'});
    const [loading, setLoading] = useState<boolean>(false);

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = event.target;

        //update input states on change event
        setInputs(prevInputs => ({...prevInputs, [name]: value}));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        console.log(inputs)

        //stop user from logging if weight hasn't been entered
        if(!inputs.weight) return; 

        const body: Omit<Weight, 'id' | 'createdAt'> = {
            accountId: user.id,
            weight: parseFloat(inputs.weight as any),
            massUnit: inputs.massUnit
        }

        console.log(body)

        setLoading(true);

        const response = await fetch('/api/weights/create', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })

        setLoading(false);

        //if the response is not ok, present the user with an error feedback message
        if(!response.ok) return setFeedback({type: 'failure', message: 'Your weight was not logged.'});

        //reset the form on success
        setInputs({weight: "", massUnit: 'lbs'});

        //revalidate weight data in parent
        mutate();

        //return feedback to the user
        setFeedback({type: 'success', message: 'New set logged'});
    }

    return ( 
        <div className="flex flex-col justify-center items-center space-y-2">
            <h2>Today&apos;s Weight</h2>
            <form className="flex flex-wrap justify-center space-x-2" onSubmit={handleSubmit}>
                <FormInput 
                    id="weight-input"
                    name="weight"
                    type="number"
                    value={inputs.weight}
                    onChange={handleChange}
                    className="basis-1/4"
                    placeholder="Weight"
                    min={0}
                    step=".01"
                    required
                />
                <select 
                    name="massUnit" 
                    id="massUnit-select" 
                    value={inputs.massUnit}
                    onChange={handleChange}
                    className={`rounded basis-1/5 px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm`}
                    required
                >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </select>
                <Button 
                    label="Log" 
                    icon={faPlus} 
                    type="submit" 
                    disabled={!inputs.weight}
                    loading={loading}
                />
            </form>
        </div>
    )
}