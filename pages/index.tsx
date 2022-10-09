import Head from "next/head";
import { AddRepoForm } from "../components/AddRepoForm";
import { CardGrid } from "../components/CardGrid";
import styles from "../styles/Home.module.css";
import { useRepos } from "../hooks";
import { useSession } from "next-auth/react";
import { NavBar } from "../components/NavBar";
import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

// find user by email
// fetch user's repo list

// importantly, the user list cache should be invalidated
// when the session is destroyed

// also still need to build ALL the api routes CRUD users.repos,
// and hope that mutate() still works on a local-only state object!

const Home = () => {
  const { data: session } = useSession();
  const { data, loading, error, mutate } = useRepos(session);

  if (loading) {
    return <p>Loading...</p>;
  }

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
          <AddRepoForm session={session} data={data} mutate={mutate} />
          {!data || loading ? (
            <div>Loading...</div>
          ) : (
            <CardGrid
              session={session}
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
