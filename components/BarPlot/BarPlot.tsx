import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { CommitFields } from "../../models";
import { useCommits } from "../../swr/useCommits";

type Props = {
  name: string;
  owner: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: true,
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        color: "white",
        display: true,
        text: "weeks ago",
      },
    },
  },
};

const BarPlot = ({ name, owner }: Props) => {
  const { data, error } = useCommits(owner, name);

  if (error) return <div>Failed to load</div>;
  try {
    if (data?.data?.status === 202) {
      return <div>Computing commit data... wait and refresh</div>;
    }
  } catch (err) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(data?.data?.data)) return <div>Loading...</div>;

  const formattedData = {
    labels: data.data.data.map((_: CommitFields, i: number) => 52 - i),
    datasets: [
      {
        label: "commits by week",
        data: data.data.data.map((t: any) => t.total),
        backgroundColor: "rgb(57, 211, 83)",
      },
    ],
  };

  return (
    <div className="relative bottom-0 left-0 right-0 flex h-48">
      <div className="absolute w-full h-full">
        <Bar options={options} data={formattedData} />
      </div>
    </div>
  );
};

export { BarPlot };
