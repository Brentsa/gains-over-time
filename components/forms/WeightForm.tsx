import FormInput from "./FormInput";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../buttons/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Inputs{
    weight: number | "",
    massUnit: 'lbs' | 'kg'
}

export default function WeightForm(){

    const [inputs, setInputs] = useState<Inputs>({weight: "", massUnit: 'lbs'});

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        console.log(inputs)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = event.target;

        //update input states on change event
        setInputs(prevInputs => ({...prevInputs, [name]: value}));
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
                <Button label="Log" icon={faPlus} type="submit"/>
            </form>
        </div>
    )
}