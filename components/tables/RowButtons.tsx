import { faAnglesLeft, faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../buttons/IconButton";
import IconSwitchButton from "../buttons/IconSwitchButton";
import { MouseEvent } from "react";

interface Props{
    showButtons: boolean,
    toggleShowButtons: () => void,
    triggerEdit: (event: MouseEvent<HTMLButtonElement>) => void,
    editRow: boolean,
    openDeleteExerciseModal: () => void
}

export default function RowButtons({showButtons, toggleShowButtons, triggerEdit, editRow, openDeleteExerciseModal}: Props){

    return (
        <div className={`flex ${showButtons ? 'basis-5/12  md:basis-36' : 'basis-10'} transition-all duration-500 overflow-hidden space-x-2 justify-end items-center order-2 sm:order-3`}>
            <button 
                className={`${showButtons && 'rotate-180'} select-none transition-all duration-500 text-violet-500`} 
                onClick={toggleShowButtons}
                style={{WebkitTapHighlightColor: 'transparent'}}
            >
                <FontAwesomeIcon icon={faAnglesLeft} size='2x'/>
            </button>  
            <div className={`flex justify-evenly overflow-hidden space-x-1`}>
                <IconSwitchButton icon={faEdit} handleClick={triggerEdit} on={editRow} iconColor='text-amber-500' bgColor='bg-amber-200'/>
                <IconButton bgColor="bg-white" bgColorTouch="bg-rose-50" iconColor="text-rose-500" icon={faTrashCan} handleClick={openDeleteExerciseModal}/> 
            </div>
        </div>
    );
}