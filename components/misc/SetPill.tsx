import { RepType, Set } from "@prisma/client"
import { Dispatch, MouseEvent, SetStateAction, useContext, useEffect, useState } from "react"
import { mutate } from "swr"
import { userContext } from "../../pages"
import ShakeSystem from "./ShakeSystem"

interface Props {
    set: Set,
    setSelectedSet: Dispatch<SetStateAction<Set | null>>,
    setSets: Dispatch<SetStateAction<Set[]>>,
    setType?: RepType
    editable: boolean
}

export default function SetPill({set, setSets, setSelectedSet, setType, editable}: Props){
    const {user} = useContext(userContext);

    //state to handle pop-in animation when the pill is created
    const [mounted, setMounted] = useState(false);

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

    //set mounted to true for pop-in animation
    useEffect(()=>{
        setMounted(true);
    }, []);

    return (
        <ShakeSystem 
            className={`bg-violet-500 text-white rounded-full ${mounted ? 'scale-100' : 'scale-0'}`}
            bShake={editable}
        >
            <>
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
            </>
        </ShakeSystem>
    )
}