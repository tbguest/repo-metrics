import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getGithubClient } from "../../../github-client";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const dbClient = await clientPromise;
  const db = dbClient.db(process.env.MONGODB_DB);

  switch (method) {
    case "GET":
      try {
        const signedIn = req.query.id !== "false";
        const collection = signedIn ? "users" : "default-repos";
        const query = signedIn
          ? { _id: new ObjectId(String(req.query.id)) }
          : {};

        const githubClient = getGithubClient();
        const response = await db.collection(collection).findOne(query);

        const user = JSON.parse(JSON.stringify(response));

        let repoDataArray = [];

        // with the saved repo names, fetch summary data for each
        for (let i = 0; i < user.savedRepos?.length; i++) {
          const { data } = await githubClient.request(
            `GET /repos/${user.savedRepos[i].owner}/${user.savedRepos[i].repo}`
          );
          // const { data: pulls } = await githubClient.request(
          //   `GET /repos/${user.savedRepos[i].owner}/${user.savedRepos[i].repo}/pulls`
          // );
          // console.log("pulls", pulls);
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
