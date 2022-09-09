import { ReactElement } from "react"

export type TabContentProps = {
    label: string, 
    children: ReactElement
}

export default function TabContent({children}: TabContentProps){
    return (
        <div className="w-full h-full">
            {children}
        </div>
    );
}