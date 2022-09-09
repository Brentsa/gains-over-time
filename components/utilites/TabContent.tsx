import { ReactNode } from "react"

export type TabContentProps = {
    label: string, 
    children: ReactNode
}

export default function TabContent({children}: TabContentProps){
    return (
        <div>
            {children}
        </div>
    )
}