import { useEffect, useState } from "react";
import useSWR from "swr";
import { calculateAverage, capitalizeAllWords, formatDateNumerical } from "../../utils/helpers";
import { ExerciseFromSWR } from "../tables/ExerciseTable";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    userId: number
    exerciseTId: number
}

interface PastExerciseProps {
    exercise: ExerciseFromSWR
}

function PastExercise({exercise}: PastExerciseProps){
    return exercise ? (
        <div className="flex-col sm:flex pb-1 border-b-2 border-rose-300 last:border-none">
            <h2 className="w-28">{formatDateNumerical(exercise.createdAt)}</h2>
            <div className="flex space-x-1 sm:space-x-2 overflow-scroll">
                {exercise.sets.map((set, i) => 
                    <div key={i} className="bg-violet-500 text-white rounded-full px-2 whitespace-nowrap">
                        {set.quantity ? `${set.quantity} x ${set.weight}` : `${set.weight} sec`}
                    </div>
                )}
            </div>
        </div>
    ) : null;
}

export default function ExerciseHistory({userId, exerciseTId}: Props){

    const {data: allUserExercises} = useSWR<ExerciseFromSWR[]>(`api/exercises/${userId}`);

    const [filteredExercises, setFilteredExercises] = useState<ExerciseFromSWR[]>([]);

    useEffect(()=>{
        if(!allUserExercises) return;
        setFilteredExercises(allUserExercises.filter(exercise => exercise.exerciseTId === exerciseTId));
    }, [allUserExercises, exerciseTId])

    useEffect(()=>{
        console.log(filteredExercises);
    }, [filteredExercises])

    if(filteredExercises.length < 1) return <div>Loading...</div>

    const options: ChartOptions<"line"> = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Exercise History',
            },
        },
        scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
      
              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            }
        }
    };
    
    const labels = filteredExercises.map(exercise => formatDateNumerical(exercise.createdAt));

    const data: ChartData<'line'> = {
        labels,
        datasets: [
            {
                label: 'Ave. Reps per Set',
                data: filteredExercises.map(exercise => calculateAverage(exercise.sets.map(set => set.quantity))),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y1'
            },
            {
                label: 'Ave. Weight per Set',
                data: filteredExercises.map(exercise => calculateAverage(exercise.sets.map(set => set.weight))),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y'
            },
        ]
    };
    
    return (
        <div className="flex flex-col items-center space-y-2 w-full">
            <h2 className="font-bold w-full mb-2 text-sm sm:text-lg lg:text-xl border-b-2 border-violet-300">
                {capitalizeAllWords(filteredExercises[0].exerciseT.name)} History
            </h2>
            <div className="flex flex-col space-y-1 w-full">
                <PastExercise exercise={filteredExercises[0]}/>
                <PastExercise exercise={filteredExercises[1]}/>
                <PastExercise exercise={filteredExercises[2]}/>
            </div>
            <div style={{width: '100%'}}>
                <Line
                    options={options}
                    data={data}
                />
            </div>
        </div>
    );
}