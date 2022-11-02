import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    className?: string
}

export default function Paper({children, className}: Props){
    return (
        <div className={`bg-white shadow p-2 lg:p-4 sm:rounded ${className}`}>
            {children}
        </div>
    )
}