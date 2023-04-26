import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MouseEvent } from "react"

interface Props {
    label: string,
    className?: string,
    handleClick?: (event: MouseEvent<HTMLButtonElement>) => void,
    type?: "button" | "submit" | "reset" | undefined,
    icon?: IconDefinition,
    iconRight?: boolean,
    disabled?: boolean
    loading?: boolean
}

export default function Button({label, className, handleClick, type, icon, iconRight, disabled, loading}: Props){
    
    return (
        <button onClick={handleClick} type={type} disabled={disabled || loading} className={`rounded bg-rose-500 text-white p-1 hover:bg-rose-400 disabled:bg-gray-300 px-4 ${className}`}>
            {!icon ?
                <>{label}</>
                :
                !iconRight ?
                    <>
                        <FontAwesomeIcon 
                            icon={loading ? faCircleNotch : icon} 
                            className={`mr-2 ${loading && 'animate-spin'}`}
                        />
                        {label}
                    </>
                    :
                    <>
                        {label}
                        <FontAwesomeIcon 
                            icon={loading ? faCircleNotch : icon} 
                            className={`mr-2 ${loading && 'animate-spin'}`}
                        />
                    </>
            }
        </button>
    )
}