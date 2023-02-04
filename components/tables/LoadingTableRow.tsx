
export default function LoadingTableRow(){
    return (
        <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row items-center w-full py-3">
                <div className="h-12 w-full sm:basis-7/12 md:basis-52 order-1"/>
                <div className="h-12 w-full sm:basis-full bg-violet-200 rounded animate-pulse order-3"/>
            </div>
            <div className='w-full h-0.5 md:h-1 bg-gradient-to-r from-rose-400 via-violet-400 to-rose-400'/>
        </div>
    )
}