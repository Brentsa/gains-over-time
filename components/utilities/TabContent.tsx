import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ReactElement } from "react"

export type TabContentProps = {
    label?: string, 
    children: ReactElement,
    icon?: IconDefinition
}

export default function TabContent({children}: TabContentProps){
    return (
        <div className="w-full h-full">
            {children}
        </div>
    );
}