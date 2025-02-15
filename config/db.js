import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI environment variable is not set");
}
const client = new MongoClient(uri);

let db;

export const connectToDatabase = async () => {
  if (!db) {
    try {
      await client.connect();
      db = client.db("prideJournal");
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      throw error;
    }
  }
  return db;
};