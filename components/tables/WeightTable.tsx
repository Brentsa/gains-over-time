import { Weight } from "@prisma/client"
import WeightTableRow from "./WeightTableRow"

interface Props{
    weightData: Weight[]
}

export default function WeightTable({weightData}: Props){

    //reverse weight records so the most recent logs are first
    const reversedWeightData = [...weightData].reverse();

    return (
        <div className="flex flex-col justify-center items-center space-y-2 w-full">
            {reversedWeightData.map(weightRecord => 
                <WeightTableRow 
                    key={weightRecord.id}
                    weightRecord={weightRecord}
                />
            )}
        </div>
    )
}