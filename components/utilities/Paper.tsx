import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    className?: string
}

export default function Paper({children, className}: Props){

    return (
        <div className={`bg-white shadow p-2 sm:p-3 md:p-4 xl:p-5 sm:rounded ${className ?? ''}`}>
            {children}
        </div>
    )
}