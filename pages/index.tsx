import Head from "next/head";
import { AddRepoForm } from "../components/AddRepoForm";
import { CardGrid } from "../components/CardGrid";
import styles from "../styles/Home.module.css";
import { useRepoList, useRepoData } from "../hooks";
import { useSession } from "next-auth/react";
import { NavBar } from "../components/NavBar";

import useSWR from "swr";
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const fetchWithIds = (url: string, ids: string[]) =>
  fetch(`${url}?ids=${ids}`).then((res) => res.json());

const defaultRepos = [
  {
    owner: "ethereum",
    repo: "go-ethereum",
    node_id: "MDEwOlJlcG9zaXRvcnkxNTQ1MjkxOQ==",
  },
  {
    owner: "cosmos",
    repo: "ibc-go",
    node_id: "MDEwOlJlcG9zaXRvcnkzMzc3NjQ1OTQ=",
  },
];

const Home = () => {
  const { data: session } = useSession();

  const options = session
    ? {
        fallbackData: defaultRepos,
      }
    : {
        fallbackData: defaultRepos,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
        revalidateOnMount: false,
      };
  const { data: list, error: listError } = useSWR(
    session && "/api/repositories",
    fetcher,
    options
  );

  const loading = !listError && !list;

  const ids = !loading ? list?.map((item: any) => item.node_id) : null;
  const {
    data: data,
    error: isError,
    mutate: mutateData,
  } = useSWR(list && "/api/gql-repositories", (url) =>
    fetchWithIds(
      url,
      list?.map((item: any) => item.node_id)
    )
  );

  const isLoading = !isError && !data;

  // find user by email
  // fetch user's repo list

  // importantly, the user list cache should be invalidated
  // when the session is destroyed

  // also still need to build ALL the api routes CRUD users.repos,
  // and hope that mutate() still works on a local-only state object!

  // const {
  //   data: list,
  //   isLoading: loading,
  //   isError: error,
  // } = useRepoList(defaultRepos, session);

  // use the repo details to fetch more data from the graphql api
  // const { data, isLoading, isError } = useRepoData(list, loading);

  if (isError) return <div>Failed to load</div>;
  // if (!data || isLoading) return <div>Loading...</div>;

  //   const { data, error, mutate } = useSWR(
  //     session && "/api/repositories",
  //     fetcher,
  //     {
  //       fallbackData: defaultRepos,
  //     }
  //   );

  //   const { data, error, mutate } = useSWR("/api/repositories", fetcher, {
  //     fallbackData: defaultRepos,
  //     revalidateIfStale: false,
  //     revalidateOnReconnect: false,
  //     revalidateOnFocus: false,
  //     revalidateOnMount: false,
  //   });

  //   const datarepos = data?.map((e) => {
  //     return <li key={e.repo}>{e.repo}</li>;
  //   });

  //   return (
  //     <div className={styles.container}>
  //       <Head>
  //         <title>GitHub Repo Statistics</title>
  //         <meta
  //           name="description"
  //           content="Compare GitHub repositories by development effort metrics"
  //         />
  //         <link rel="icon" href="/favicon.ico" />
  //       </Head>
  //       <main className={styles.main}>
  //         <>
  //           <ul className={styles.container}>{data && datarepos}</ul>
  //           <AddRepoForm session={session} data={data} mutate={mutate} />
  //         </>
  //       </main>
  //     </div>
  //   );
  // };

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
          <AddRepoForm
            session={session}
            list={list}
            data={data}
            mutateData={mutateData}
          />
          {!data || isLoading ? (
            <div>Loading...</div>
          ) : (
            <CardGrid list={list} repoData={data} loading={isLoading} />
          )}
        </>
      </main>
    </div>
  );
};

export default Home;
