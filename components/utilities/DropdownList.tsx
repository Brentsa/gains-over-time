import { faChevronDown, faChevronUp, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExerciseTemplate } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { capitalizeAllWords } from "../../utils/helpers";
import DropdownItem from "./DropdownItem";
import OutsideClickHandler from "./OutsideClickHandler";

interface Props {
    state: ExerciseTemplate | undefined,
    updateState: Dispatch<SetStateAction<ExerciseTemplate | undefined>>,
    dropdownItems: ExerciseTemplate[],
    className?: string
}

export default function DropdownList({dropdownItems, state, updateState, className}: Props){

    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value)
    }

    useEffect(()=>{
        if(!open) setSearch('');
    }, [open])

    return (
        <OutsideClickHandler onClickOutside={()=>setOpen(false)} className={`relative select-none ${className ?? ''}`}>
            <>
                <div
                    id="exercise-template-select"
                    className={`flex justify-between items-center ${open ? 'rounded-t': 'rounded'} w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10`}
                    onClick={()=>setOpen(prev => !prev)}
                >
                    {state?.name ? capitalizeAllWords(state.name) : 'Select Exercise'}
                    <FontAwesomeIcon icon={!open ? faChevronDown : faChevronUp}/>
                </div>
                {open &&
                    <ul className="absolute rounded-b w-full border border-t-0 border-gray-300 bg-white z-50 max-h-96 overflow-scroll hover:cursor-pointer shadow-xl">
                        <div className="flex items-center justify-between px-2 sticky top-0 bg-white">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                            <input 
                                className="w-full border-none outline-none focus:ring-0"
                                type="text" 
                                placeholder="Enter Exercise Name"
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                        {dropdownItems
                            .filter(exercise => exercise.name.toLowerCase().includes(search.toLowerCase()))
                            .map((exercise, id) => 
                                <DropdownItem 
                                    key={id} 
                                    exercise={exercise}
                                    setSelected={updateState}
                                    setOpen={setOpen}
                                    active={state?.id === exercise.id}
                                >
                                    <div className="w-full flex justify-between items-center">
                                        <p>{capitalizeAllWords(exercise.name)}</p>
                                        <p className="text-sm">{exercise.targetSets} x {exercise.targetReps} reps</p>
                                    </div>
                                </DropdownItem>
                            )
                        }
                    </ul>
                }
            </>
        </OutsideClickHandler>
    );
}