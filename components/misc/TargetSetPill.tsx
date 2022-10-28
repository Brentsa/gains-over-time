interface Props {
    numReps: number
}

export default function TargetSetPill({numReps}: Props){

    return (
        <div className="bg-violet-500 text-white opacity-40 rounded-full flex items-center justify-center px-4">
            <h3>{numReps} Reps</h3>
        </div>
    )
}