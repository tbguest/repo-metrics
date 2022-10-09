import type { NextApiRequest, NextApiResponse } from "next";
import { getGithubClient } from "../../github-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const githubClient = getGithubClient();

  try {
    const owner = req.query.owner;
    const repo = req.query.repo;

    const { data } = await githubClient.request(`GET /repos/${owner}/${repo}`);

    const obj = {
      repo: data.name,
      owner: data.owner.login,
      description: data.description,
      starGazers: data.stargazers_count,
      watchers: data.watchers,
      issues: data.open_issues,
      forks: data.forks,
      id: data.node_id,
    };

    res.status(200).json(obj);
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
