
export default function LoadingTableRow(){
    return (
        <div className="flex flex-col sm:flex-row items-center w-full p-3 bg-white sm:rounded shadow-lg">
            <div className="h-12 w-full sm:basis-7/12 md:basis-52 order-1"/>
            <div className="h-12 w-full sm:basis-full bg-violet-200 rounded animate-pulse order-3 shadow-inner"/>
        </div>
    )
}