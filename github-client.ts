import { Octokit } from "@octokit/rest";

export const getGithubClient = () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  return octokit;
};
