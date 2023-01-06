import { calculateAverage, formatDateShort } from '../../utils/helpers';
import { ExerciseFromSWR } from '../tables/ExerciseTable';
import { GraphType } from './ExerciseHistory';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

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
    exercises: ExerciseFromSWR[],
    show: GraphType
}

export default function ExerciseChart({exercises, show}: Props){

    //return the graph data set based on the shown graph type
    function determineDatasets(){
        const repData = {
            label: 'Average Reps',
            data: exercises.map(exercise => calculateAverage(exercise.sets.map(set => set.quantity))).reverse(),
            borderColor: 'rgb(244, 63, 94)',
            backgroundColor: 'rgba(244, 63, 94, 0.5)',
            yAxisID: 'y1'
        }

        const weightData = {
            label: 'Average Weight',
            data: exercises.map(exercise => calculateAverage(exercise.sets.map(set => set.weight))).reverse(),
            borderColor: 'rgb(139, 92, 246)',
            backgroundColor: 'rgba(139, 92, 246, 0.5)',
            yAxisID: 'y'
        }

        switch(show){
            case 'reps':
                return [repData];
            case 'weight':
                return [weightData];
            case 'both': 
                return [repData, weightData];
        }
    }

    return (
        <Line
            options={{
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
                        display: false,
                        text: 'Exercise History',
                    },
                },
                scales: show !== 'both' ? undefined : {
                    y: {
                      type: 'linear',
                      display: true,
                      title: {
                        display: true,
                        text: 'Weight (lbs)'
                      },
                      position: 'left',
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      title: {
                        display: true,
                        text: 'Number of Reps'
                      },
                      ticks: {
                        precision: 0
                      },
                      // grid line settings
                      grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                      },
                    }
                } 
            }}
            data={{
                labels: exercises.map(exercise => formatDateShort(exercise.createdAt)).reverse(),
                datasets: determineDatasets()
            }}
        />
    );
}