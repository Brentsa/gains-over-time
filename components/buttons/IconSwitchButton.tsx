import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MouseEvent, useState } from "react"

interface Props {
    icon: IconDefinition
    className?: string,
    handleClick: (event: MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
    iconColor?: string,
    bgColor?: string
}

export default function IconSwitchButton({className, handleClick, icon, disabled, iconColor, bgColor}: Props){

    const [switchOn, setSwitchOn] = useState<boolean>(false);

    const colors = `${iconColor ?? 'text-rose-500'} ${switchOn ? (bgColor ?? 'bg-rose-50') : ''}`

    function handleSwitchClick(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        handleClick(event);
        setSwitchOn(prev => !prev);
    }

    return (
        <button 
            onClick={handleSwitchClick} 
            disabled={disabled} 
            className={`rounded-full w-12 h-12 text-2xl p-1 ${colors} disabled:bg-gray-300 disabled:text-white ${className ?? ''}`}
        >
            <FontAwesomeIcon icon={icon}/>
        </button>
    )
}