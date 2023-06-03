import { useContext } from "react";
import Paper from "./utilities/Paper";
import { userContext } from "../pages";
import useSWR from "swr";
import { Weight } from "@prisma/client";
import fetcher from "../utils/swrFetcher";
import WeightChart from "./misc/WeightChart";
import WeightForm from "./forms/WeightForm";
import WeightTable from "./tables/WeightTable";

export default function WeightTrackingPage(){

    const {user} = useContext(userContext);
    
    const {data, mutate} = useSWR<Weight[]>(`api/weights/${user.id}`, fetcher);

    return (
        <div className="flex flex-col justify-center items-center p-4 space-y-4">
            <Paper className="rounded space-y-4 w-full md:w-8/12">
                <WeightForm mutate={mutate}/>
                {data && <WeightChart weights={data}/>}
            </Paper>
            {data &&
                <div className="space-y-4 w-full md:w-8/12">
                    <WeightTable weightData={data}/>
                </div>
            }
        </div>
    )
}