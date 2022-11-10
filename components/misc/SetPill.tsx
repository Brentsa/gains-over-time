import { RepType } from "@prisma/client"

interface Props {
    quantity: number,
    weight: number,
    setType?: RepType
    editable?: boolean
}

export default function SetPill({quantity, weight, setType, editable}: Props){

    return (
        <div className={`bg-violet-500 text-white rounded-full relative flex flex-col sm:flex-row items-center justify-center px-3`}>
            <h3 className="text-sm z-10 whitespace-nowrap">
                {quantity !== 0 && quantity + " x"}
            </h3>
            <h3 className="text-sm z-10 whitespace-nowrap sm:ml-1">
                {weight} {setType === 'seconds' ? 'sec' : 'lbs'}
            </h3>
            {editable && <span className="absolute rounded-full w-8 h-6 bg-rose-500 animate-ping"/>}
        </div>
    )
}