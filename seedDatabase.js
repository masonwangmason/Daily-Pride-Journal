import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker"; // Use faker.js to generate random data
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const uri = process.env.MONGO_URI; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function generateEntries() {
  const entries = [];
  for (let i = 0; i < 1000; i++) {
    const date = faker.date.past().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const content = [
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
    ];
    entries.push({ date, content });
  }
  return entries;
}

async function seedDatabase() {
  try {
    await client.connect();
    const db = client.db("prideJournal"); // Replace with your database name
    const entries = await generateEntries();
    const result = await db.collection("entries").insertMany(entries);
    console.log(`Inserted ${result.insertedCount} entries`);
  } catch (error) {
    console.error("Failed to seed database:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();