import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export default function Paper({children}: Props){
    return (
        <div className="bg-white shadow p-2 lg:p-4 sm:rounded">
            {children}
        </div>
    )
}