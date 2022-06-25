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

const BarPlot = ({ name }: string) => {
  const [owner, repo] = name.split("/");

  const { data, error } = useSWR(
    `/api/github?owner=${owner}&repo=${repo}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log("data", data);

  const formattedData = {
    labels: data.data.data.map((_, i) => 52 - i),
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
