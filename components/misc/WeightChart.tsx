import { formatDateShort } from '../../utils/helpers';
import { Line } from 'react-chartjs-2';
import { Weight } from '@prisma/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales
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
    weights: Weight[]
}

export default function WeightChart({weights}: Props){

    if(weights.length < 2) return <div>Log your weight a few more times to view your weight tracking graph</div>

    return (
        <Line
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom' as const
                    },
                    title: {
                        display: true,
                        text: 'Weight Over Time Graph',
                    },
                },
            }} 
            data={{
                labels: weights.map(weightRecord => formatDateShort(weightRecord.createdAt)),
                datasets: [
                    {
                        label: `Weight (${weights[0].massUnit})`,
                        data: weights.map(weightRecord => weightRecord.weight),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)'              
                    }
                ],
            }} 
        />
    );
}