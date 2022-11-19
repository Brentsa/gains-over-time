import { RepType } from "@prisma/client"
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react"
import { BasicSet } from "../tables/ExerciseTableRow"

interface Props {
    set: BasicSet,
    setSelectedSet: Dispatch<SetStateAction<BasicSet | null>>
    setType?: RepType
    editable?: boolean
}

export default function SetPill({set, setSelectedSet, setType, editable}: Props){
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

    function deleteSet(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        console.log('delete')
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
            className={`bg-violet-500 text-white rounded-full transition-all duration-100 ${editable && 'shadow shadow-gray-800 hover:bg-rose-400'}`}
            style={editable ? {transform: `rotate(${rotationDeg}deg)`} : undefined}
        >
            <button 
                className={`h-full w-full rounded-full flex flex-col sm:flex-row items-center justify-center px-3 hover:cursor-pointer`}
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
                <button className="h-5 w-5 rounded-full bg-rose-500 shadow shadow-gray-800 text-sm absolute top-0 right-0" onClick={deleteSet}>x</button>
            }
        </div>
    )
}