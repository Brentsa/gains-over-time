import { Weight } from "@prisma/client"
import Paper from "../utilities/Paper"
import { formatDateShortMonth } from "../../utils/helpers"

interface Props{
    weightRecord: Weight
}

export default function WeightTableRow({weightRecord}:Props){

    return (
        <Paper className="flex justify-between items-center px-4 w-full md:w-1/2 rounded">
            <h2 className="text-2xl">{weightRecord.weight} <span className="text-sm">{weightRecord.massUnit}</span></h2>
            <p className="text-sm">{formatDateShortMonth(weightRecord.createdAt)}</p>
        </Paper>
    )
}