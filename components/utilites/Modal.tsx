import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent, ReactNode } from "react";
import Paper from "./Paper";

interface Props {
    open: boolean,
    closeModal: (event: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void,
    children: ReactNode
}

export default function Modal({open, closeModal, children}: Props){


    return open ? (
        <div className="z-40 fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <Paper className="w-1/3 h-1/2 relative shadow-xl shadow-gray-900/50">
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