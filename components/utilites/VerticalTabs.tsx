import { ReactElement, useEffect, useRef, useState } from "react"
import TabItem from "./TabItem"
import {TabContentProps} from "./TabContent";

type Props = {
    children: ReactElement<TabContentProps>[]
}

export type TabInfo = {
    index: number, 
    position: number, 
    height: number
}

export default function VerticalTabs({children}: Props){

    //instantiate state to hold current tab height and position for the tab selection slider
    const [tabInfo, setTabInfo] = useState<TabInfo>({index: 0, position: 0, height: 0});

    //instantiate state to hold the tab container's top offset for the slider's relative position
    const [parentTopOffset, setParentTopOffset] = useState<number>(0);

    //define a reference to each tab's divs as well as a reference to the tab container div to acquire their height and positions
    const tabsRef = useRef<Array<HTMLDivElement | null>>([]);
    const tabContainerDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        //declare variables to hold the current tabs height and top position as well as the containers top offset
        const elementHeight = tabsRef.current[tabInfo.index]?.clientHeight;
        const elementOffset = tabsRef.current[tabInfo.index]?.offsetTop;
        const parentOffset = tabContainerDiv.current?.offsetTop;

        //if any of the variables above are not set exit the function
        if(!elementHeight || !elementOffset || !parentOffset) return;

        //set the relevent states if we pass the variable check
        setTabInfo(prevState => ({...prevState, position: elementOffset, height: elementHeight}));
        setParentTopOffset(parentOffset);

    }, [tabInfo.index, tabContainerDiv])

    return (
       <div className="flex">
            <div className="basis-auto flex flex-col items-end space-y-2">
                {children.map((child, i)=>
                    <TabItem 
                        label={child.props.label} 
                        index={i} 
                        active={tabInfo.index === i}
                        setActiveTabIndex={setTabInfo}
                        key={i} 
                        ref={(element: HTMLDivElement) => tabsRef.current[i] = element}
                    />)}
            </div>
            <div className="relative" ref={tabContainerDiv}>
                <div 
                    className="bg-violet-400 w-1 absolute transition-all" 
                    style={{
                        height: tabInfo.height, 
                        top: tabInfo.position - parentTopOffset, 
                        left: '-100%'
                    }}
                />
                <div className="bg-gray-200 w-0.5 h-full"/>
            </div>
            <div className="basis-full py-2 px-4">
                { children[tabInfo.index] }
            </div>
       </div> 
    )
}