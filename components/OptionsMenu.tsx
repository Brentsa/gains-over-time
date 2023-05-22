import { IconDefinition, faBars, faDumbbell, faGear, faHouse, faUser, faWeightScale, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LogoutButton from "./buttons/LogoutButton"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Paper from "./utilities/Paper";
import OutsideClickHandler from "./utilities/OutsideClickHandler";
import IconSwitchButton from "./buttons/IconSwitchButton"
import { Pages } from "./MainPageContainer";
import { capitalizeFirstChar } from "../utils/helpers";

interface Props {
    currentPage: Pages,
    setPage: Dispatch<SetStateAction<Pages>>,
    isMobile?: boolean
}

interface MenuItemProps extends Props{
    page: Pages
    icon: IconDefinition
    setOpen: Dispatch<SetStateAction<boolean>>
    hideOnMobile?: boolean
}

function MenuItem({currentPage, setPage, page, icon, setOpen}: MenuItemProps){

    //close modal and set the current page
    function handleClick(){
        setOpen(false);
        setPage(page);
    }

    //show the menu item if the current page is different than the menu item
    return ( currentPage !== page ?
        <li>
            <button onClick={handleClick} className="hover:bg-black/5 px-2 py-1 rounded w-full">
                <div className="flex justify-start items-center space-x-2 text-lg">
                    <FontAwesomeIcon icon={icon} className="basis-1/5"/> 
                    <p className="basis-4/5 text-left">{capitalizeFirstChar(page)}</p>
                </div>
            </button>
        </li>
        :
        null
    );
}

export default function OptionsMenu({currentPage, setPage, isMobile}: Props){

    const [open, setOpen] = useState<boolean>(false);

    function toggleOpen(){
        setOpen(prev => !prev);
    }

    //if the menu is open, toggle it off
    function handleClickOutside(){
        if(open) toggleOpen();
    }

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
                    <Paper className="absolute mt-1 right-0 rounded shadow-xl border z-50 w-40 sm:w-44">
                        <ul className="space-y-2 mb-4">
                            <MenuItem icon={faHouse} page="home" currentPage={currentPage} setPage={setPage} setOpen={setOpen}/>
                            <MenuItem icon={faWeightScale} page="weight" currentPage={currentPage} setPage={setPage} setOpen={setOpen}/>
                            {isMobile && <MenuItem icon={faDumbbell} page="templates" currentPage={currentPage} setPage={setPage} setOpen={setOpen}/>}
                            <MenuItem icon={faUser} page="account" currentPage={currentPage} setPage={setPage} setOpen={setOpen}/>
                        </ul>
                        <LogoutButton/>
                    </Paper>
                }
            </>
        </OutsideClickHandler>
    )
    
}