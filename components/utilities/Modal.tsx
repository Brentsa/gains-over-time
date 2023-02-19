import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useEffect } from "react";
import OutsideClickHandler from "./OutsideClickHandler";

interface Props {
    open: boolean,
    closeModal: () => void,
    children: ReactNode
}

export default function Modal({open, closeModal, children}: Props){
    
    //stop scrolling when the modal is open
    useEffect(() => {
        document.body.style.overflowY = open ? 'hidden' : '';
        document.body.style.touchAction = open ? 'none' : '';
    }, [open])

    if(!open) return null;

    return (
        <div className="z-50 fixed top-0 left-0 w-screen h-screen animate-fade-in-modal flex items-center justify-center">
            <OutsideClickHandler onClickOutside={() => closeModal()} className="bg-white p-2 pb-4 sm:p-4 lg:p-6 sm:rounded w-full pt-8 sm:pt-10 sm:w-6/12 lg:w-fit lg:max-w-2xl relative shadow-xl shadow-gray-900/50 pointer-events-auto overflow-hidden">
                <>
                    <button className="absolute top-2 right-3 text-rose-500" onClick={closeModal}>
                        <FontAwesomeIcon size="2x" icon={faXmark} />
                    </button>
                    <section className="w-full h-full flex items-center justify-center">
                        {children}
                    </section>
                </>
            </OutsideClickHandler>
        </div>
    );
}