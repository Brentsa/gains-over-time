import { Weight } from "@prisma/client"
import WeightTableRow from "./WeightTableRow"
import { useState } from "react";
import { formatDateMonth, isSameMonth } from "../../utils/helpers";

interface Props{
    weightData: Weight[]
}

export default function WeightTable({weightData}: Props){

    //reverse weight records so the most recent logs are first
    const reversedWeightData = [...weightData].reverse();

    return (
        <div className="flex flex-col justify-center items-center space-y-2 w-full">
            {reversedWeightData.map((weightRecord, i, data) => 
                <WeightTableRow 
                    key={weightRecord.id}
                    weightRecord={weightRecord}
                    //show the month if it is the first weight record and any other time the month between records changes
                    showMonth={i===0 || !isSameMonth(data[i-1].createdAt, weightRecord.createdAt)}
                />
            )}
        </div>
    )
}