import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getGithubClient } from "../../../github-client";
import client from "../../../lib/db";

const defaultRepos = [
  {
    owner: "facebook",
    repo: "react",
    id: "10270250",
  },
  {
    owner: "sveltejs",
    repo: "svelte",
    id: "74293321",
  },
  {
    owner: "solidjs",
    repo: "solid",
    id: "130884470",
  },
  {
    owner: "withastro",
    repo: "astro",
    node_id: "348060227",
  },
  {
    owner: "angular",
    repo: "angular",
    id: "24195339",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const dbClient = client;
  const db = dbClient.db(process.env.MONGODB_DB);

  switch (method) {
    case "GET":
      try {
        const userId = req.query.id;
        const githubClient = getGithubClient();

        // If there's no user, use the default repos
        let savedRepos = defaultRepos;
        // Otherwise, get the user's saved repos
        if (userId) {
          const collection = userId ? "users" : "default-repos";
          const query = userId ? { _id: new ObjectId(String(userId)) } : {};
          const response = await db.collection(collection).findOne(query);
          const user = JSON.parse(JSON.stringify(response));
          savedRepos = user.savedRepos;
        }

        // With the saved repo names, fetch summary data for each
        let repoDataArray = [];
        for (const repo of savedRepos) {
          const { data } = await githubClient.request(
            `GET /repos/${repo.owner}/${repo.repo}`
          );
          repoDataArray.push({
            repo: data.name,
            owner: data.owner.login,
            description: data.description,
            starGazers: data.stargazers_count,
            watchers: data.watchers,
            issues: data.open_issues,
            forks: data.forks,
            id: data.node_id,
          });
        }

        res.status(200).json(repoDataArray);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PATCH":
      try {
        const userId = req.query.id;
        const data = req.body.document;

        const query = { _id: new ObjectId(String(userId)) };
        const updateDocument = {
          $push: { savedRepos: data },
        };
        const response = await db
          .collection("users")
          .updateOne(query, updateDocument);
        if (!response) {
          return res.status(400).json({ success: false });
        }
        res.status(201).json({ success: true, data: response });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      const id = req.query.id;
      const userId = req.query.userId;
      try {
        const query = { _id: new ObjectId(String(userId)) };
        const updateDocument = {
          $pull: { savedRepos: { id: id } },
        };
        const response = await db
          .collection("users")
          .updateOne(query, updateDocument);

        if (!response) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
