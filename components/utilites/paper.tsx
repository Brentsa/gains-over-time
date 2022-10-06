import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export default function Paper({children}: Props){
    return (
        <div className="bg-white shadow p-3 rounded">
            {children}
        </div>
    )
}