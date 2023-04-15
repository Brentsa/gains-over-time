import { RepType, Set } from "@prisma/client"
import { Dispatch, MouseEvent, SetStateAction, useContext, useEffect, useState } from "react"
import { mutate } from "swr"
import { userContext } from "../../pages"

interface Props {
    set: Set,
    setSelectedSet: Dispatch<SetStateAction<Set | null>>,
    setSets: Dispatch<SetStateAction<Set[]>>,
    setType?: RepType
    editable?: boolean
}

export default function SetPill({set, setSets, setSelectedSet, setType, editable}: Props){
    const user = useContext(userContext);

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

        //update the previous exercise SWRs (for ExerciseHistory popup)
        mutate(`api/exercises/${user?.id}`);

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
                className={`h-full w-full rounded-full flex flex-col items-center justify-center px-4 hover:cursor-pointer hover:bg-violet-400`}
                onClick={handleSetClick}
                disabled={!editable}
            >
                <p className="text-sm whitespace-nowrap">
                    {`${set.quantity} ${setType !== 'lbs' && setType === 'seconds' ? 'sec' : 'reps'}`}
                </p>
                {(setType === 'lbs' || setType === 'levels') &&
                    <p className="text-sm whitespace-nowrap sm:ml-1">
                        {setType === 'lbs' ? `${set.weight} lbs` : `level ${set.weight}`}
                    </p>
                }
            </button>
            {editable && 
                <button 
                    className="h-5 w-5 rounded-full bg-rose-600 shadow shadow-gray-600 text-sm absolute top-0 -right-1 hover:bg-rose-500 hover:text-gray-100 z-10" 
                    onClick={deleteSet}
                >
                    x
                </button>
            }
        </div>
    )
}