import Head from "next/head";
import { AddRepoForm } from "../components/AddRepoForm";
import { CardGrid } from "../components/CardGrid";
import styles from "../styles/Home.module.css";
import { useRepoList, useRepoData } from "../hooks";

const Home = () => {
  const {
    data: list,
    isLoading: loading,
    isError: error,
    mutate,
  } = useRepoList();
  const { data, isLoading, isError } = useRepoData(list, loading);

  if (isError) return <div>Failed to load</div>;
  if (!data || isLoading) return <div>Loading...</div>;

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
          <AddRepoForm mutate={mutate} />
          <CardGrid list={list} repoData={data} loading={isLoading} />
        </>
      </main>
    </div>
  );
};

export default Home;
