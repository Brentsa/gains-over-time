import RenderVerticalTabs from "./RenderVerticalTabs";
import Paper from "./utilities/Paper";

export default function TemplatesPage(){

    return (
        <div className='flex flex-col mt-4'>
            <div className='basis-1/3'>
                <div className='flex flex-col flex-wrap space-y-4'>
                    <Paper className="rounded">
                        <RenderVerticalTabs/>
                    </Paper>
                </div>
            </div>
        </div>
    )
}