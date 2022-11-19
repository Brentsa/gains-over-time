import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import Paper from "./Paper";

interface Props {
    open: boolean,
    closeModal: () => void,
    children: ReactNode
}

export default function Modal({open, closeModal, children}: Props){


    return open ? (
        <div className="z-40 fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <Paper className="w-10/12 py-8 sm:w-5/12 lg:w-3/12 sm:py-10 lg:py-12 relative shadow-xl shadow-gray-900/50">
                <button className="absolute top-2 right-3 text-rose-500" onClick={closeModal}>
                    <FontAwesomeIcon size="2x" icon={faXmark} />
                </button>
                <section className="w-full h-full flex items-center justify-center">
                    {children}
                </section>
            </Paper>
        </div>
    ): <></>;
}