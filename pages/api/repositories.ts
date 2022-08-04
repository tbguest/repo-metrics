import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type RepoIDs = {
  owner: string;
  repo: string;
  node_id: string;
};

interface Data {
  repos: RepoIDs;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const dbClient = await clientPromise;
  const db = dbClient.db(process.env.MONGODB_DB);
  const response = await db
    .collection("repositories")
    .find({})
    .limit(20)
    .toArray();

  res.status(200).json(JSON.parse(JSON.stringify(response)));
}
