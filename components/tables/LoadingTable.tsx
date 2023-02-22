import LoadingTableRow from "./LoadingTableRow";

export default function LoadingTable(){

    return (
        <div>
            <div className='w-full h-1 mb-3 rounded bg-gradient-to-r from-rose-500 via-violet-500 to-rose-500 animate-pulse'/>
            <div className="space-y-2">
                <LoadingTableRow/>
                <LoadingTableRow/>
                <LoadingTableRow/>
            </div>
            <div className='w-full h-1 mt-8 mb-3 rounded bg-gradient-to-r from-rose-500 via-violet-500 to-rose-500 animate-pulse'/>
            <div className="space-y-2">
                <LoadingTableRow/>
                <LoadingTableRow/>
                <LoadingTableRow/>
            </div>
            <div className='w-full h-1 mt-8 mb-3 rounded bg-gradient-to-r from-rose-500 via-violet-500 to-rose-500 animate-pulse'/>
            <div className="space-y-2">
                <LoadingTableRow/>
                <LoadingTableRow/>
                <LoadingTableRow/>
            </div>
        </div>
    )
}