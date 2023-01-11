import { Dispatch, SetStateAction } from "react"
import { capitalizeAllWords } from "../../utils/helpers"

interface Props {
    children: any,
    name: string,
    setSelected: Dispatch<SetStateAction<string>>,
    setOpen: Dispatch<SetStateAction<boolean>>,
    value: string | number | readonly string[] | undefined,
    defaultValue?: string | number | readonly string[] | undefined
}

export default function DropdownItem(props: Props){

    function handleClick(){
        props.setSelected(capitalizeAllWords(props.name))
        props.setOpen(false);
    }
    
    return (
        <li
            className="px-2 py-1 hover:bg-rose-400"
            value={props.value} 
            defaultValue={props?.defaultValue}
            onClick={handleClick}
        >
            {props.children}
        </li>
    )
}