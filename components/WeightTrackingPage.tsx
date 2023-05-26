import { useContext } from "react";
import Paper from "./utilities/Paper";
import { userContext } from "../pages";
import useSWR from "swr";
import { Weight } from "@prisma/client";
import fetcher from "../utils/swrFetcher";
import WeightChart from "./misc/WeightChart";
import WeightForm from "./forms/WeightForm";

export default function WeightTrackingPage(){

    const {user} = useContext(userContext);
    
    const {data} = useSWR<Weight[]>(`api/weights/${user.id}`, fetcher);

    console.log(data);

    return (
        <div className="flex justify-center mt-4">
            <Paper className="rounded space-y-4 w-full md:w-4/12">
                <WeightForm/>
                {data &&
                    <WeightChart weights={data}/>
                }
            </Paper>
        </div>
    )
}