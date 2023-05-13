import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Muscle } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { capitalizeAllWords } from "../../utils/helpers";
import OutsideClickHandler from "./OutsideClickHandler";

interface Props {
    selectedMuscles: Omit<Muscle, "createdAt">[]
    setSelectedMuscles: Dispatch<SetStateAction<Omit<Muscle, "createdAt">[]>>
    dropdownItems: Muscle[]
    disabled?: boolean
    className?: string
}

export default function MuscleDropdownList({dropdownItems, selectedMuscles, setSelectedMuscles, className, disabled}: Props){

    const [open, setOpen] = useState<boolean>(false);
    const [openAbove, setOpenAbove] = useState<boolean>(false)
    
    const divRef = useRef<HTMLDivElement>(null);

    //check if the muscle array contains the given muscle based on the supplied ID
    function bIsIdInArray(id: number): boolean{
        for(let i = 0; i < selectedMuscles.length; i++){
            if(selectedMuscles[i].id === id) return true; 
        }

        return false;
    }

    useEffect(()=>{
        //set the menu to open above the select button if the screen space is too small to contain it
        if(divRef.current) setOpenAbove(divRef.current?.getBoundingClientRect().bottom + 240 > window.screen.availHeight);
    }, [divRef])

    return (
        <OutsideClickHandler onClickOutside={()=>setOpen(false)} className={`relative select-none w-full ${className ?? ''}`}>
            <div ref={divRef}>
                <button
                    id="exercise-template-select"
                    className={`flex justify-between items-center text-gray-500 ${selectedMuscles.length > 0 ? 'rounded-t' : 'rounded'} w-full text-sm px-3 py-2 ${open ? 'border-2 border-violet-400' : 'border border-gray-300'} z-10`}
                    onClick={() => setOpen(prev => !prev)}
                    type="button"
                    disabled={disabled}
                >
                    <p>Select Muscles</p>
                    <FontAwesomeIcon className="text-xs" icon={!open ? faChevronDown : faChevronUp}/>
                </button>
                <ul className={`${open ? 'absolute' : 'hidden'} z-50 ${openAbove ? 'bottom-1' : 'top-1'} -left-2 rounded w-full border p-2 space-y-0.5 bg-gray-200 border-gray-300 h-60 select-none overflow-scroll hover:cursor-pointer shadow-xl shadow-gray-400`}>
                    {dropdownItems
                        .map((muscle, i) => 
                        <li
                            key={i}
                            className={`px-2 py-0.5 rounded text-sm ${ bIsIdInArray(muscle.id) ? 'bg-rose-500 text-white' : 'sm:hover:bg-rose-200'} `}
                            onClick={() => {
                                if(bIsIdInArray(muscle.id)){
                                    //remove muscle ID from the selected muscles array
                                    setSelectedMuscles(prev => prev.filter(item => item.id !== muscle.id));
                                }
                                else{
                                    //add muscle ID to the selected muscles array
                                    setSelectedMuscles(prev => prev.concat({id: muscle.id, name: muscle.name}));
                                }
                            }}
                        >
                            {capitalizeAllWords(muscle.name)}
                        </li>
                        )
                    }
                </ul>
            </div>
        </OutsideClickHandler>
    );
}
