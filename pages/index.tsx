import { gql } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import { AiFillStar } from "react-icons/ai";
import { VscRepoForked } from "react-icons/vsc";
import { getApolloClient } from "../apollo-client";
import { CardLink } from "../components/CardLink";
import { Repo } from "../models";
import styles from "../styles/Home.module.css";

const Home: NextPage = ({ repo }: Repo) => {
  const repoCard = Object.keys(repo).map((key: string, index) => {
    return (
      <div className={styles.repocard} key={key}>
        <CardLink href={`/${repo[key].id}`}>
          <h2>{repo[key].nameWithOwner}</h2>
          <h3>{repo[key].description}</h3>
          <p>
            <AiFillStar />: {repo[key].stargazerCount}
          </p>
          <p>
            <VscRepoForked />: {repo[key].forkCount}
          </p>
        </CardLink>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>GitHub projects by development effort</h1>
        <p>
          Disclaimer: The merit of a project cannot be judged solely based on
          the metrics shown here. Use your judgement.
        </p>
        <div className={styles.grid}>{repoCard}</div>
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const client = getApolloClient();

  const repositories = [
    { owner: "ethereum", repo: "go-ethereum" },
    { owner: "paritytech", repo: "polkadot" },
    { owner: "ava-labs", repo: "avalanchego" },
    { owner: "cosmos", repo: "ibc-go" },
    { owner: "solana-labs", repo: "solana" },
  ];

  const { data } = await client.query<Repo>({
    query: gql`
      fragment repoProperties on Repository {
        id
        description
        forkCount
        name
        nameWithOwner
        stargazerCount
        issues {
          totalCount
        }
        mentionableUsers {
          totalCount
        }
        assignableUsers {
          totalCount
        }
        pullRequests {
          totalCount
        }
        object(expression: "master") {
          ... on Commit {
            id
            history {
              totalCount
            }
          }
        }
      }
      
      {
        ${repositories
          .map(
            ({ owner, repo }, index) => `repo${
              index + 1
            }: repository(owner: "${owner}", name: "${repo}") {
          ...repoProperties
        }`
          )
          .join("\n")}
      }`,
  });

  const repo = data;

  return {
    props: {
      repo,
    },
  };
}
