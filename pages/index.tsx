import Head from "next/head";
import { useState } from "react";
import { AddRepoForm } from "../components/AddRepoForm";
import { CardGrid } from "../components/CardGrid";
import styles from "../styles/Home.module.css";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const useFetchRepoList = () => {
    const { data } = useSWR("/api/repositories", fetcher);
    return data;
  };

  const initialData = [];
  const list = useFetchRepoList();
  const [repoList, setRepoList] = useState(list);
  const [repoData, setRepoData] = useState("loading");
  const [loading, setLoading] = useState("idle");

  const useFetchRepoData = (list: any) => {
    const ids = list?.map((item: any) => item.node_id);
    const { data, error } = useSWR(`/api/gql-repositories?ids=${ids}`, fetcher);
    console.log("data", data);

    return { data, error };
  };

  // const { data, error } = useFetchRepoData();
  const { data, error } = useFetchRepoData(list);
  // setRepoData(data?.data.nodes);

  const handleDelete = async (id: String) => {
    const updatedList = repoList.filter((item: any) => {
      return item.node_id != id;
    });
    setRepoList(updatedList);

    const response = await fetch(`/api/repositories?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  };

  // if (error) return <div>Failed to load</div>;
  // if (!data) return <div>Loading...</div>;

  // if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>GitHub Repo Statistics</title>
        <meta
          name="description"
          content="Compare GitHub repositories by development effort metrics"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <>
          <h1>GitHub projects by development effort</h1>
          <p>
            Disclaimer: The merit of a project cannot be judged solely on the
            metrics shown here. Use your judgement.
          </p>
          <AddRepoForm repoList={repoList} setRepoList={setRepoList} />
          <CardGrid
            repoData={repoData}
            loading={loading}
            onClose={handleDelete}
          />
        </>
      </main>
    </div>
  );
};

export default Home;
