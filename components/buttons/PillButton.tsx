import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { capitalizeAllWords } from "../../utils/helpers";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { Muscle } from "@prisma/client"

interface Props {
    label: string,
    id: number,
    setArray: Dispatch<SetStateAction<Omit<Muscle, 'createdAt'>[]>>
}

export default function PillButton({label, id, setArray}: Props){

    function removePill(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();

        //filter out this pill based on ID from the parent object array and update state
        setArray((prevState) => prevState.filter(object => object.id !== id));
    }

    return (
        <div className="relative flex items-center h-full bg-violet-200 rounded-full px-4 space-x-2">
            <p className="text-sm pr-1">{capitalizeAllWords(label)}</p>
            <button 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-white bg-rose-600 shadow text-sm  hover:bg-rose-500 hover:text-gray-100 z-10" 
                onClick={removePill}
            >
                x
            </button>
        </div>
    );
}