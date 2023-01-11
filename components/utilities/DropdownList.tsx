import { faChevronDown, faChevronUp, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExerciseTemplate } from "@prisma/client";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { capitalizeAllWords } from "../../utils/helpers";
import DropdownItem from "./DropdownItem";

interface Props {
    dropdownItems: ExerciseTemplate[]
}

export default function DropdownList({dropdownItems}: Props){

    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value)
        console.log(search);
    }

    useEffect(()=>{
        if(!open) setSearch('');
    }, [open])

    return (
        <div className="relative select-none">
            <div
                id="exercise-template-select"
                className={`flex justify-between items-center rounded w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10`}
                onClick={()=>setOpen(prev => !prev)}
            >
                {selected || 'Select Exercise'}
                <FontAwesomeIcon icon={!open ? faChevronDown : faChevronUp}/>
            </div>
            {open &&
                <ul className="absolute rounded w-full mt-1 border border-gray-300 bg-white z-50 max-h-60 overflow-scroll hover:cursor-pointer shadow">
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
                        .filter(exercise => exercise.name.includes(search.toLowerCase()))
                        .map((exercise, id) => 
                            <DropdownItem 
                                key={id} 
                                value={exercise.id}
                                name={exercise.name}
                                setSelected={setSelected}
                                setOpen={setOpen}
                            >
                                {capitalizeAllWords(exercise.name)} - {exercise.targetSets} x {exercise.targetReps}
                            </DropdownItem>
                        )
                    }
                </ul>
            }
        </div>
    );
}
