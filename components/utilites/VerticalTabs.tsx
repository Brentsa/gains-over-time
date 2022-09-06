import { forwardRef, ReactNode, useLayoutEffect, useRef, useState } from "react"

type Props = {
    children?: ReactNode
}

type TabInfo = {
    index: number, 
    position: number, 
    height: number
}

type TabProps = {
    label: string,
    index: number,
    setActiveTabIndex: any
}

const Tab = forwardRef((props: TabProps, ref: any) => {
    const {label, index, setActiveTabIndex} = props;

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        console.log('clicked', index);
        setActiveTabIndex((prevState: TabInfo) => { return {...prevState, index: index}});
    }

    return (
        <div className="p-2 pr-4" ref={ref}>
            <button onClick={handleClick}>
                {label}
            </button>
        </div>)
});

export default function VerticalTabs({children}: Props){

    const [tabInfo, setTabInfo] = useState<TabInfo>({index: 0, position: 0, height: 0});

    const tabsRef = useRef<Array<HTMLDivElement | null>>([]);

    const names = ['Exercise', 'Workout', 'Misc.', 'Super'];

    useLayoutEffect(()=>{
        const elementHeight = tabsRef.current[tabInfo.index]?.clientHeight;
        const elementOffset = tabsRef.current[tabInfo.index]?.offsetTop;
        console.log(tabsRef.current)

        if(elementHeight && elementOffset){
            console.log(elementHeight, elementOffset);
            setTabInfo({...tabInfo, position: elementOffset, height: elementHeight})
        }
    }, [tabInfo.index])


    return (
       <div className="flex">
            <div className="basis-auto flex flex-col items-end space-y-2">
                {names.map((name, i)=>
                    <Tab 
                        label={name} 
                        index={i} 
                        setActiveTabIndex={setTabInfo}
                        key={i} 
                        ref={(element: HTMLDivElement) => tabsRef.current[i] = element}
                    />)}
            </div>
            <div className="relative">
                { tabInfo.height && tabInfo.position &&
                    <div className="bg-amber-500 w-1 absolute transition-all" style={{height: tabInfo.height, top: tabInfo.position - 100, left: '-100%'}}/>
                }
                <div className="bg-gray-200 w-0.5 h-full"/>
            </div>
            <div className="basis-full p-2">
                Hello
            </div>
       </div> 
    )
}