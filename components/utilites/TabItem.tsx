import { forwardRef, Ref } from "react"
import { TabInfo } from './VerticalTabs';

type Props = {
    label: string,
    index: number,
    setActiveTabIndex: any
}

const TabItem = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    //destructure the tab props
    const {label, index, setActiveTabIndex} = props;

    //called when the tab is clicked, set the active tab in the tab component
    function handleClick(){
        setActiveTabIndex((prevState: TabInfo) => { return {...prevState, index: index}});
    }

    return (
        <div className="p-2 pr-4" ref={ref}>
            <button onClick={handleClick}>
                {label}
            </button>
        </div>)
});

export default TabItem;