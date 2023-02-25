import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MouseEvent } from "react"

interface Props {
    icon: IconDefinition
    className?: string,
    handleClick: (event: MouseEvent<HTMLButtonElement>) => void,
    type?: "button" | "submit" | "reset" | undefined,
    disabled?: boolean
}

export default function IconButton({className, handleClick, type, icon, disabled}: Props){

    return (
        <button 
            onClick={handleClick} 
            type={type} 
            disabled={disabled} 
            className={`rounded-full w-12 h-12 text-2xl p-1 shrink-0 ${className ?? 'text-rose-500 hover:bg-rose-50 disabled:bg-gray-300 disabled:text-white'}`}
        >
            <FontAwesomeIcon icon={icon}/>
        </button>
    )
}