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

    const classes = `rounded bg-rose-500 text-white p-1 px-4 hover:bg-rose-400 disabled:bg-gray-300 ${className} whitespace-nowrap`;

    //return button with no icon
    if(!icon) return (
        <button onClick={handleClick} type={type} disabled={disabled || loading} className={classes}>
            {label}
        </button>
    )
    //return button with left icon
    else if(!iconRight) return (
        <button onClick={handleClick} type={type} disabled={disabled || loading} className={classes}>
            <FontAwesomeIcon 
                icon={loading ? faCircleNotch : icon} 
                className={`mr-2 ${loading && 'animate-spin'}`}
            />
            {label}
        </button>
    )
    //return button with right icon
    else return(
        <button onClick={handleClick} type={type} disabled={disabled || loading} className={classes}>
            {label}
            <FontAwesomeIcon 
                icon={loading ? faCircleNotch : icon} 
                className={`ml-2 ${loading && 'animate-spin'}`}
            />
        </button>
    )
    
}