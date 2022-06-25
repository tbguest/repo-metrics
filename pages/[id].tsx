import { gql } from "@apollo/client";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getApolloClient } from "../apollo-client";
import styles from "../styles/Page.module.css";
import { Card } from "../components/Card";

import { Octokit } from "@octokit/rest";
import { getGithubClient } from "../github-client";

import React, { useState, useEffect } from "react";
import LinePlot from "../components/LinePlot/LinePlot";

const Repo: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ stats }) => {
  // console.log("stats", stats);
  return (
    <main className={styles.main}>
      <div className={styles.app}>
        {/* <button onClick={regenerateData}>Change Data</button> */}
        <LinePlot data={stats} width={300} height={100} />
      </div>
      {/* <Card>
        <h2>{repo.nameWithOwner}</h2>
        <p>Open issues: {repo.openIssues.totalCount}</p>
        <p>Open PRs: {repo.pullRequests.totalCount}</p>
        <p>
          Commits in last 30 days:{" "}
          {repo.defaultBranchRef.target.history.totalCount}
        </p>
      </Card> */}
    </main>
  );
};

export default Repo;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  const { id } = context.params;

  // console.log("id", id);

  const data = await octokit.request(
    "GET /repos/{owner}/{repo}/stats/commit_activity",
    {
      owner: "ethereum",
      repo: "go-ethereum",
    }
  );

  // console.log("data", data.data);

  const stats = data.data;

  return {
    props: {
      stats: stats,
    },
  };
};
