import { RepType } from "@prisma/client"

interface Props {
    quantity: number,
    weight: number,
    setType?: RepType
}

export default function SetPill({quantity, weight, setType}: Props){

    return (
        <div className="bg-violet-500 text-white rounded-full flex flex-col sm:flex-row items-center justify-center px-3">
            <h3 className="text-sm whitespace-nowrap">
                {quantity !== 0 && quantity + " x"}
            </h3>
            <h3 className="text-sm whitespace-nowrap sm:ml-1">
                {weight} {setType === 'seconds' ? 'sec' : 'lbs'}
            </h3>
        </div>
    )
}