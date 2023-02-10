import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    className?: string
    id?: string
}

export default function Paper({children, className, id}: Props){

    return (
        <div id={id} className={`bg-white shadow-lg p-2 sm:p-3 md:p-4 xl:p-5 sm:rounded ${className ?? ''}`}>
            {children}
        </div>
    )
}