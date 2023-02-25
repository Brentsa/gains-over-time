import { faMinus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect, useRef, useState } from "react";
import IconButton from "./buttons/IconButton";
import SearchBar from "./SearchBar";

export default function MobileSearchBar(){

    const [open, setOpen] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false);

    //toggle the search bar open
    function toggleOpen(){
        setOpen(prev => !prev);
    }

    //ref to hold the current screen width
    const screenWidth = useRef(0);

    //set the screen width
    useLayoutEffect(()=>{
        screenWidth.current = screen.availWidth;
    })

    return (
        <div className="h-screen w-screen fixed top-0 left-0 pointer-events-none">
            <div className={`right-0 ${focus ? 'bottom-96' : 'bottom-4'} bot absolute p-2 transition-all z-40 pointer-events-auto`}>
                <div 
                    className={`bg-rose-500 p-1 rounded-full shadow-lg transition-all duration-150 flex justify-between items-center overflow-hidden`}
                    style={{width: open ? screenWidth.current-16 : 56}}
                >
                    {open &&
                        <div className="w-4/5 ml-1">
                            <SearchBar rounded setFocus={setFocus}/>
                        </div>
                    }
                    <IconButton 
                        className={`text-white hover:bg-rose-400 select-none`}
                        icon={!open ? faSearch : faMinus} 
                        handleClick={toggleOpen}
                    />
                </div>
            </div>
        </div>
    )
}