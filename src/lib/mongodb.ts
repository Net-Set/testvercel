import { MongoClient } from "mongodb";

let client: MongoClient | null = null;
const uri = process.env.MONGODB_URI || "your-mongodb-uri";
client = new MongoClient(uri);
const clientPromise: Promise<MongoClient> = client.connect();

import { Document } from "mongodb";

export const getCollection = async <T extends Document>(collectionName: string) => {
  const dbName = process.env.MONGODB_DB || "default-db";
  const db = (await clientPromise).db(dbName);
  return db.collection<T>(collectionName);
};

export default clientPromise;
