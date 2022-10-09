import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getGithubClient } from "../../github-client";
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
        const signedIn = req.query.signedin === "true";
        const collection = signedIn ? "repositories" : "repositories-defaults";

        const githubClient = getGithubClient();
        const response = await db
          .collection(collection)
          .find({})
          .limit(20)
          .toArray();

        const list = JSON.parse(JSON.stringify(response));

        let repoDataArray = [];

        for (let i = 0; i < list?.length; i++) {
          const { data } = await githubClient.request(
            `GET /repos/${list[i].owner}/${list[i].repo}`
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

    case "POST":
      try {
        const data = req.body.document;

        const response = await db.collection("repositories").insertOne(data);
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
      try {
        const response = await db
          .collection("repositories")
          .deleteOne({ _id: new ObjectId(id) });

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
