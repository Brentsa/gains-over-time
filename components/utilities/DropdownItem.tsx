
interface Props {
    children: any,
    value?: string | number | readonly string[] | undefined,
    defaultValue?: string | number | readonly string[] | undefined
}

export default function DropdownItem(props: Props){
    
    return (
        <li
            className="px-2 py-1 hover:bg-rose-400"
            value={props?.value} 
            defaultValue={props?.defaultValue}
        >
            {props.children}
        </li>
    )
}