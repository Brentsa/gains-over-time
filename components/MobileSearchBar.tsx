import { faMinus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import IconButton from "./buttons/IconButton";
import SearchBar from "./SearchBar";

export default function MobileSearchBar(){

    const [open, setOpen] = useState<boolean>(false);

    //toggle the search bar open
    function toggleOpen(){
        setOpen(prev => !prev);
    }

    //ref to hold the current screen width
    const screenWidth = useRef(0);

    //set the screen width
    useEffect(()=>{
        screenWidth.current = screen.availWidth;
    })

    return (
        // <div className={`p-2 transition-all z-40 absolute -bottom-[4.5rem]`}>
        <div className={`p-2 transition-all z-40 fixed bottom-6 right-0 `}>
            <div 
                className={`bg-rose-500 p-1 rounded-full shadow-lg ${open ? 'shadow-black/30' : 'shadow-black/20'} transition-all duration-150 flex justify-end items-center overflow-hidden`}
                style={{width: open ? screenWidth.current-16 : 56}}
            >
                {open &&
                    <div className="grow ml-1 mr-2">
                        <SearchBar rounded/>
                    </div>
                }
                <IconButton
                    bgColor="bg-rose-500"
                    bgColorTouch="bg-rose-400"
                    iconColor="text-white"
                    icon={!open ? faSearch : faMinus} 
                    handleClick={toggleOpen}
                />
            </div>
        </div>
    )
}