import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { firstLetterToUpperCase } from "../../utils/helpers";
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
        <div className="flex justify-between items-center h-full bg-gray-300 rounded-full px-4 space-x-2">
            <p>{firstLetterToUpperCase(label)}</p>
            <button className="text-amber-500" onClick={removePill}>
                <FontAwesomeIcon icon={faX}/>
            </button>
        </div>
    );
}