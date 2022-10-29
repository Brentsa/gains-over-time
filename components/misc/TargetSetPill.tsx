import { RepType } from "@prisma/client"

interface Props {
    numReps: number
    setType?: RepType
}

export default function TargetSetPill({numReps, setType}: Props){

    return (
        <div className="bg-violet-500 text-white opacity-40 rounded-full flex items-center justify-center px-3 sm:px-4">
            <h3 className="text-sm sm:text-base">{numReps} {setType && setType === 'seconds' ? 'sec' : 'reps'}</h3>
        </div>
    )
}