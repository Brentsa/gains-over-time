import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MouseEvent, useState } from "react"

interface Props {
    icon: IconDefinition
    className?: string,
    bgColor: string,
    bgColorTouch: string,
    iconColor: string
    handleClick: (event: MouseEvent<HTMLButtonElement>) => void,
    type?: "button" | "submit" | "reset" | undefined,
    disabled?: boolean
}

export default function IconButton({className, handleClick, type, icon, disabled, bgColor, bgColorTouch, iconColor}: Props){

    const [buttonFlash, setButtonFlash] = useState(false);

    function handleTouchStart(){
        setButtonFlash(true);
    }

    function handleTouchEnd(){
        setButtonFlash(false);
    }

    function handleClickStart(){
        setButtonFlash(true);
    }

    function handleClickEnd(){
        setButtonFlash(false);
    }

    return (
        <button 
            onClick={handleClick} 
            type={type} 
            disabled={disabled} 
            className={`rounded-full w-12 h-12 text-2xl p-1 shrink-0 ${iconColor} ${!buttonFlash ? bgColor : bgColorTouch} disabled:bg-gray-300 disabled:text-white ${className}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleClickStart}
            onMouseUp={handleClickEnd}
            onMouseOut={handleClickEnd}
            style={{WebkitTapHighlightColor: 'transparent'}}
        >
            <FontAwesomeIcon icon={icon}/>
        </button>
    )
}