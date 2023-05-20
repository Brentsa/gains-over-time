import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MouseEvent, useEffect, useState } from "react"

interface Props {
    icon: IconDefinition,
    on: boolean,
    className?: string,
    handleClick: (event: MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
    iconColor?: string,
    bgColor?: string
}

export default function IconSwitchButton({className, on, handleClick, icon, disabled, iconColor, bgColor}: Props){

    const [switchOn, setSwitchOn] = useState<boolean>(on);

    const colors = `${iconColor ?? 'text-rose-500'} ${switchOn ? (bgColor ?? 'bg-rose-50') : ''}`

    function handleSwitchClick(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        handleClick(event);
        setSwitchOn(prev => !prev);
    }

    useEffect(()=>{
        setSwitchOn(on);
    }, [on])

    return (
        <button 
            onClick={handleSwitchClick} 
            disabled={disabled} 
            className={`select-none rounded-full w-12 h-12 text-2xl p-1 ${colors} disabled:bg-gray-300 disabled:text-white ${className ?? ''}`}
        >
            <FontAwesomeIcon icon={icon}/>
        </button>
    )
}