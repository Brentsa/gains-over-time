import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    className?: string
    id?: string,
    paddingNone?: boolean
}

export default function Paper({children, className, id, paddingNone}: Props){

    return (
        <div id={id} className={`bg-white shadow-lg sm:rounded ${!paddingNone ? 'p-2 sm:p-3 md:p-4 xl:p-5' : ''} ${className ?? ''}`}>
            {children}
        </div>
    )
}