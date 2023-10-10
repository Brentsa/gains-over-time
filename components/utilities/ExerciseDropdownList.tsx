import { faChevronDown, faChevronUp, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExerciseTemplate } from "@prisma/client";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { capitalizeAllWords } from "../../utils/helpers";
import DropdownItem from "./DropdownItem";
import OutsideClickHandler from "./OutsideClickHandler";

interface Props {
    state: ExerciseTemplate | undefined,
    updateState: Dispatch<SetStateAction<ExerciseTemplate | undefined>>,
    dropdownItems: ExerciseTemplate[],
    className?: string
}

export default function ExerciseDropdownList({dropdownItems, state, updateState, className}: Props){

    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value)
    }

    //Compare exercise names for exercise template sorting
    function compareExercises(e1: ExerciseTemplate, e2: ExerciseTemplate){
        const name1 = e1.name.toLowerCase();
        const name2 = e2.name.toLowerCase();

        //sort names alphabetically in desc order
        return name1 > name2 ? 1 : -1; 
    }

    function toggleDropdown(event:MouseEvent<HTMLButtonElement>){
        event?.preventDefault();
        return setOpen(prev => !prev);
    }

    useEffect(()=>{
        if(!open) setSearch('');
    }, [open])

    return (
        <OutsideClickHandler onClickOutside={()=>setOpen(false)} className={`relative select-none ${className ?? ''}`}>
            <div>
                <div
                    id="exercise-template-select"
                    className={`flex justify-between items-center select-none ${open ? 'rounded-t shadow-xl shadow-black/40': 'rounded'} w-full px-3 py-2 border border-gray-300 text-gray-500  z-10`}
                >
                    {open ? 
                        <div className="flex items-center justify-between w-full space-x-2 sticky top-0 bg-white">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                            <input 
                                autoFocus
                                className="w-full border-none outline-none p-0 focus:ring-0 focus:outline-none focus:z-20"
                                type="text" 
                                placeholder="Search For Exercise"
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                        :
                        <button
                            className={`w-full text-left ${state?.name && !open ? 'text-black' : 'text-gray-500'}`}
                            onClick={(toggleDropdown)}
                        >
                            {state?.name ? capitalizeAllWords(state.name) : 'Select Exercise To Record'}
                        </button>
                    }
                    <button
                        style={{WebkitTapHighlightColor: 'transparent'}}
                        onClick={toggleDropdown}>
                        <FontAwesomeIcon className="text-xl" icon={!open ? faChevronDown : faChevronUp}/>
                    </button>
                </div>
                {open &&
                    <ul className="absolute rounded-b w-full border border-t-0 border-gray-300 bg-white z-50 max-h-96 overflow-scroll hover:cursor-pointer shadow-lg shadow-black/40">
                        {dropdownItems
                            .filter(exercise => exercise.name.toLowerCase().includes(search.toLowerCase()))
                            .sort(compareExercises)
                            .map((exercise, id) => 
                                <DropdownItem 
                                    key={id} 
                                    exercise={exercise}
                                    setSelected={updateState}
                                    setOpen={setOpen}
                                    active={state?.id === exercise.id}
                                >
                                    <div className="w-full flex justify-between items-center overflow-hidden">
                                        <p className="whitespace-nowrap">{capitalizeAllWords(exercise.name)}</p>
                                        <p className="whitespace-nowrap text-xs">{exercise.targetSets} x {exercise.targetReps} reps</p>
                                    </div>
                                </DropdownItem>
                            )
                        }
                    </ul>
                }
            </div>
        </OutsideClickHandler>
    );
}
