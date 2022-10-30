import { RepType } from "@prisma/client"

interface Props {
    quantity: number,
    weight: number
    setType?: RepType
}

export default function SetPill({quantity, weight, setType}: Props){

    return (
        <div className="bg-violet-500 text-white rounded-full flex items-center justify-center px-3 sm:px-4">
            <h3 className="text-sm sm:text-base">{quantity} x {weight} {setType && setType === 'seconds' ? 'sec' : 'lbs'}</h3>
        </div>
    )
}