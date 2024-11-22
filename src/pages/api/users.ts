import type { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "../../lib/mongodb";

interface User {
  _id: string;
  name: string;
  email: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ error: `Method ${req.method} is not allowed` });
  }
};

const handleGetRequest = async (res: NextApiResponse) => {
  try {
    const collection = await getCollection<User>("users");
    const users = await collection.find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // Logs the error for debugging
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export default handler;
