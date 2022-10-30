import Head from "next/head";
import { AddRepoForm } from "../components/AddRepoForm";
import { CardGrid } from "../components/CardGrid";
import { useUserRepos } from "../hooks";
import { useSession } from "next-auth/react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { RiBarChartFill } from "react-icons/ri";
import { LoadingCard } from "../components/LoadingCard";

const Home = () => {
  const { data: session } = useSession();
  const { data, loading, error, mutate } = useUserRepos(session);

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="min-h-full py-6 px-4 sm:px-8 ml-auto mr-auto max-w-[var(--content-max-width)]">
      <Head>
        <title>Repo Metrics</title>
        <meta
          name="description"
          content="Compare GitHub repositories by development effort metrics"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar session={session} />
      <main className="md:top-[var(--nav-height)] md:grid md:grid-rows-1 md:grid-cols-[40%_auto] md:gap-10 flex flex-col align-center max-w-full top-0 [color:var(--text-color)]">
        <section className="md:sticky md:pt-8 relative w-full top-[var(--nav-height)] flex flex-col justify-between self-start mb-8">
          <h1 className="flex font-lexend text-4xl font-bold md:text-5xl mt-14 mb-12">
            <RiBarChartFill className="fill-[var(--brand-icon-color)]" />
            RepoMetrics
          </h1>
          <h2 className="font-bold text-2xl mb-10">
            Compare GitHub projects by interest and development effort
          </h2>
          <AddRepoForm data={data} mutate={mutate} />
        </section>
        <section className="relative top-[var(--nav-height)] md:pt-4 min-w-full md:min-w-0 flex flex-col">
          {!data || loading ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
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
