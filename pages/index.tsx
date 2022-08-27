import Head from "next/head";
import { useEffect, useState } from "react";
import { AddRepoForm } from "../components/AddRepoForm";
import { CardGrid } from "../components/CardGrid";
import styles from "../styles/Home.module.css";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data: list } = useSWR("/api/repositories", fetcher);
  const ids = list?.map((item: any) => item.node_id);
  const { data: allData, error: error } = useSWR(
    () => `/api/gql-repositories?ids=${ids}`,
    fetcher
  );

  // TODO: remove state variables and rely on SWR instead; move data fetching into a hook

  const [repoList, setRepoList] = useState(list);
  const [repoData, setRepoData] = useState(allData);
  const [loading, setLoading] = useState("idle");

  useEffect(() => {
    setRepoList(list);
    setRepoData(allData);
  }, [list, allData]);

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

  if (error) return <div>Failed to load</div>;
  if (!repoData) return <div>Loading...</div>;

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
