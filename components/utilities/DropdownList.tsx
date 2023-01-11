import { faChevronDown, faChevronUp, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, useState } from "react";
import DropdownItem from "./DropdownItem";

interface Props {
    children: JSX.Element[],
    value: string | number | readonly string[] | undefined,
    onChange: any
}

export default function DropdownList({children, value, onChange}: Props){

    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('');

    return (
        <div className="relative select-none">
            <div
                id="exercise-template-select"
                //name="exercise"
                className={`flex justify-between items-center rounded w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10`}
                // value={value}
                // onChange={onChange}
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
                        />
                    </div>
                    {/* <DropdownItem defaultValue={0} value={0}>Select Exercise</DropdownItem> */}
                    {children}
                </ul>
            }
        </div>
    );
}
