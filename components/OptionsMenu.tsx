import { faBars, faGear, faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LogoutButton from "./buttons/LogoutButton"
import { useState } from "react"
import Paper from "./utilities/Paper";
import OutsideClickHandler from "./utilities/OutsideClickHandler";
import Link from "next/link";
import IconSwitchButton from "./buttons/IconSwitchButton"


export default function OptionsMenu(){

    const [open, setOpen] = useState<boolean>(false);

    function toggleOpen(){
        setOpen(prev => !prev);
    }

    function handleClickOutside(){
        if(open){
            toggleOpen();
        }
    }

    const liClass = "hover:bg-black/5 px-2 py-1 rounded flex items-center space-x-2";

    return (
        <OutsideClickHandler className="relative" onClickOutside={handleClickOutside}>
            <>
                <IconSwitchButton 
                    icon={!open ? faBars : faXmark}
                    handleClick={toggleOpen}
                    bgColor="bg-black/5"
                    iconColor="text-black"
                    on={open}
                />
                {open && 
                    <Paper className="absolute mt-1 right-0 rounded shadow-xl border space-y-2">
                        <ul className="space-y-1">
                            <li className={liClass}>
                                <FontAwesomeIcon icon={faUser}/>
                                <Link href='#'>Account</Link>
                            </li>
                            <li className={liClass}>
                                <FontAwesomeIcon icon={faGear}/>
                                <Link href='#'>Settings</Link>
                            </li>
                        </ul>
                        <LogoutButton/>
                    </Paper>
                }
            </>
        </OutsideClickHandler>
    )
    
}