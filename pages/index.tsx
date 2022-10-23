import Head from "next/head";
import { AddRepoForm } from "../components/AddRepoForm";
import { CardGrid } from "../components/CardGrid";
import styles from "../styles/Home.module.css";
import { useUserRepos } from "../hooks";
import { useSession } from "next-auth/react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { RiBarChartFill } from "react-icons/ri";
import { CardLink } from "../components/CardLink";
import { PlaceholderCard } from "../components/PlaceholderCard";

const Home = () => {
  const { data: session } = useSession();
  const { data, loading, error, mutate } = useUserRepos(session);

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Repo Metrics</title>
        <meta
          name="description"
          content="Compare GitHub repositories by development effort metrics"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar session={session} />
      <main className={styles.main}>
        <section className={styles.content_sticky}>
          <h1 className={styles.brand}>
            <RiBarChartFill className={styles.icon} />
            RepoMetrics
          </h1>
          <h2>Compare GitHub projects by interest and development effort</h2>
          <AddRepoForm data={data} mutate={mutate} />
        </section>
        <section className={styles.content}>
          {!data || loading ? (
            <>
              <PlaceholderCard />
              <PlaceholderCard />
              <PlaceholderCard />
            </>
          ) : (
            <CardGrid
              data={data}
              loading={loading}
              error={error}
              mutate={mutate}
            />
          )}
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Home;
