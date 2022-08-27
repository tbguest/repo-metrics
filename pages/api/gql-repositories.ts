import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { AllRepos, Repo } from "../../models";

import { getApolloClient } from "../../apollo-client";
import { repoQuery } from "../../queries/repositories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ids = String(req.query.ids).split(",");
  const client = getApolloClient();

  try {
    const { data } = await client.query<AllRepos>({
      query: repoQuery,
      variables: {
        id: ids,
      },
    });
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}
