import type { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "../../lib/mongodb";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const collection = await getCollection<User>("users");
      const users = await collection.find().toArray();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
