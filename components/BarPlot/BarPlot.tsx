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
import useSWR from "swr";
import { CommitFields } from "../../models";
import styles from "./BarPlot.module.css";

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
  scales: {
    x: {
      title: {
        color: "black",
        display: true,
        text: "weeks ago",
      },
    },
  },
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// TODO: tackle this tricky typing...
const BarPlot = ({ name }: any) => {
  const [owner, repo] = name.split("/");

  const { data, error } = useSWR(
    `/api/github?owner=${owner}&repo=${repo}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const formattedData = {
    labels: data.data.data.map((_: CommitFields, i: number) => 52 - i),
    datasets: [
      {
        label: "commits",
        data: data.data.data.map((t: any) => t.total),
        backgroundColor: "rgb(57, 211, 83)",
      },
    ],
  };

  return (
    <div className={styles.plot}>
      <Bar options={options} data={formattedData} />
    </div>
  );
};

export { BarPlot };
