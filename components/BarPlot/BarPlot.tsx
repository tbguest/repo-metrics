import useSWR from "swr";
import styles from "./BarPlot.module.css";
import { BarChart } from "../../components/BarChart";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BarPlot = ({ name }: string) => {
  const [owner, repo] = name.split("/");

  const { data, error } = useSWR(
    `/api/github?owner=${owner}&repo=${repo}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.plot}>
      <BarChart data={data.data.data} width={500} height={200} />
    </div>
  );
};

export { BarPlot };
