import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

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
        const response = await db
          .collection("repositories")
          .find({})
          .limit(20)
          .toArray();

        res.status(200).json(JSON.parse(JSON.stringify(response)));
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
          .deleteOne({ node_id: id });
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
