import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MouseEvent } from "react"

interface Props {
    label: string,
    className?: string,
    handleClick?: (event: MouseEvent<HTMLButtonElement>) => void,
    type?: "button" | "submit" | "reset" | undefined,
    icon?: IconDefinition,
    iconRight?: boolean
}

export default function Button({label, className, handleClick, type, icon, iconRight}: Props){
    return (
        <button onClick={handleClick} type={type} className={`rounded bg-rose-500 text-white p-1 hover:bg-rose-400 px-4 ${className}`}>
            {!icon ?
                <>{label}</>
                :
                !iconRight ?
                    <><FontAwesomeIcon icon={icon} className='mr-2'/>{label}</>
                    :
                    <>{label}<FontAwesomeIcon icon={icon} className='ml-2'/></>
            }
        </button>
    )
}