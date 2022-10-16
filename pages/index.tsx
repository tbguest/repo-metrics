import Head from "next/head";
import { AddRepoForm } from "../components/AddRepoForm";
import { CardGrid } from "../components/CardGrid";
import styles from "../styles/Home.module.css";
import { useUserRepos } from "../hooks";
import { useSession } from "next-auth/react";
import { NavBar } from "../components/NavBar";

const Home = () => {
  const { data: session } = useSession();
  const { data, loading, error, mutate } = useUserRepos(session);

  if (error) {
    return <p>Error</p>;
  }

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
          <NavBar session={session} />
          <h1>GitHub projects by development effort</h1>
          <p>
            Disclaimer: The merit of a project cannot be judged solely on the
            metrics shown here. Use your judgement.
          </p>
          <AddRepoForm data={data} mutate={mutate} />
          {!data || loading ? (
            <div>Loading...</div>
          ) : (
            <CardGrid
              data={data}
              loading={loading}
              error={error}
              mutate={mutate}
            />
          )}
        </>
      </main>
    </div>
  );
};

export default Home;
