import { useEffect, useRef } from "react";

interface Props {
    children: JSX.Element,
    onClickOutside: () => void,
    className: string
}

export default function OutsideClickHandler({children, onClickOutside, className}: Props){

    //instantiate a reference to the wrapper element
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(!wrapperRef) return; 

        function handleClickOutside(event: MouseEvent){
            //check if the mouse event target is within the wrapper, call the outside click button if it is
            if(wrapperRef.current && !wrapperRef.current.contains(event.target as Node)){
                onClickOutside();
            }
        }

        //add an event listener on component mount that calls the clicked outside function
        document.addEventListener('mousedown', handleClickOutside);

        //remove the event listener when the component unmounts
        return () => document.removeEventListener('mousedown', handleClickOutside)

    }, [wrapperRef, onClickOutside])

    return (
        <div ref={wrapperRef} className={className}>
            {children}
        </div>
    );
}