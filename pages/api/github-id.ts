import type { NextApiRequest, NextApiResponse } from "next";
import { getGithubClient } from "../../github-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const githubClient = getGithubClient();

  const owner = req.query.owner;
  const repo = req.query.repo;

  try {
    const data = await githubClient.request(`GET /repos/${owner}/${repo}`);
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}
