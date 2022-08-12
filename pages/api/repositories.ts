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
        // res.status(400).json({ success: false })
        res.status(400);
      }
      break;

    case "POST":
      try {
        const data = req.body.document;

        const response = await db.collection("repositories").insertOne(data);
        console.log(response);
        // res.status(201).json({ message: "Data inserted successfully!" });
        res.status(201);

        if (!response) {
          // return res.status(400).json({ success: false });
          return res.status(400);
        }
        // res.status(200).json({ success: true, data: response });
        res.status(200);
      } catch (error) {
        // res.status(400).json({ success: false });
        res.status(400);
      }
      break;

    // case "DELETE":
    //   try {
    //     // const deletedPet = await Pet.deleteOne({ _id: id });
    //     const response = await db
    //       .collection("repositories")
    //       .deleteOne({ _id: id });
    //     if (!response) {
    //       // return res.status(400).json({ success: false });
    //       return res.status(400);
    //     }
    //     // res.status(200).json({ success: true, data: {} });
    //     res.status(200);
    //   } catch (error) {
    //     // res.status(400).json({ success: false });
    //     res.status(400);
    //   }
    //   break;

    default:
      // res.status(400).json({ success: false });
      res.status(400);
      break;
  }
}
