import { forwardRef, Ref } from "react"
import { TabInfo } from './VerticalTabs';

type Props = {
    label: string,
    index: number,
    active: boolean
    setActiveTabIndex: any
}

const TabItem = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    //destructure the tab props
    const {label, index, setActiveTabIndex, active} = props;

    //called when the tab is clicked, set the active tab in the tab component
    function handleClick(){
        setActiveTabIndex((prevState: TabInfo) => { return {...prevState, index: index}});
    }

    return (
        <div className="pr-2" ref={ref}>
            <button onClick={handleClick} className={`p-2 rounded hover:bg-gray-100 ${active && 'text-rose-500 font-bold'}`}>
                {label}
            </button>
        </div>)
});

TabItem.displayName = 'TabItem';

export default TabItem;