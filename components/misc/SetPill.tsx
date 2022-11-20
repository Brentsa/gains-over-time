import { RepType } from "@prisma/client"
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react"
import { useSWRConfig } from "swr"
import { BasicSet } from "../tables/ExerciseTableRow"

interface Props {
    set: BasicSet,
    setSelectedSet: Dispatch<SetStateAction<BasicSet | null>>,
    setSets: Dispatch<SetStateAction<BasicSet[]>>,
    setType?: RepType
    editable?: boolean
}

export default function SetPill({set, setSets, setSelectedSet, setType, editable}: Props){
    const shakeDegrees = 4
    const [rotationDeg, setRotationDeg] = useState<number>(0);

    //shake the pill once using the supplied degrees
    function shake(degrees: number): void{
        setRotationDeg(degrees);
        setTimeout(()=>{
            setRotationDeg(-degrees);
            setTimeout(()=>{
                setRotationDeg(0);
            }, 100)
        }, 100);
    }

    function handleSetClick(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault()
        if(!editable) return;
        setSelectedSet(set);
    }

    async function deleteSet(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        
        const response = await fetch(`api/set/delete/${set.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })

        if(!response.ok) return console.log('Set could not be deleted');

        //remove the set from the exercise row
        setSets(prevSetArray => prevSetArray.filter(prevSet => prevSet.id !== set.id));
    }

    useEffect(()=>{
        if(!editable) return; 

        //shake the pill if editable and then set an interval until it is uneditable
        shake(shakeDegrees);
        const shakeFrequencyInterval = setInterval(()=>shake(shakeDegrees), 1500);

        //clear the shake interval when the component unmounts
        return () => clearInterval(shakeFrequencyInterval);
    }, [editable])

    return (
        <div 
            className={`bg-violet-500 text-white rounded-full transition-all duration-100 ${editable && 'shadow shadow-gray-800'}`}
            style={editable ? {transform: `rotate(${rotationDeg}deg)`} : undefined}
        >
            <button 
                className={`h-full w-full rounded-full flex flex-col sm:flex-row items-center justify-center px-3 hover:cursor-pointer hover:bg-violet-400`}
                onClick={handleSetClick}
                disabled={!editable}
            >
                <h3 className="text-sm z-10 whitespace-nowrap">
                    {set.quantity !== 0 && set.quantity + " x"}
                </h3>
                <h3 className="text-sm z-10 whitespace-nowrap sm:ml-1">
                    {set.weight} {setType === 'seconds' ? 'sec' : 'lbs'}
                </h3>
                
            </button>
            {editable && 
                <button 
                    className="h-5 w-5 rounded-full bg-rose-600 shadow shadow-gray-600 text-sm absolute top-0 right-0 hover:bg-rose-500 hover:text-gray-100" 
                    onClick={deleteSet}
                >
                    x
                </button>
            }
        </div>
    )
}