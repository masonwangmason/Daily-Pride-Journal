import express from "express";
import { connectToDatabase } from "../config/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/*
const entries = [
  {
    id: 1,
    date: "June 2, 2025",
    content: [
      "Today, I am proud of myself for completing my first project at work.",
      "I was able to finish it on time and my boss was very impressed with my work.",
      "I feel accomplished and motivated to take on more challenges in the future.",
      "I helped a colleague with their project.",
      "I received positive feedback from a client.",
    ],
  },
  {
    id: 2,
    date: "June 1, 2025",
    content: [
      "I went for a run in the morning.",
      "I cooked a healthy meal for lunch.",
      "I read a book in the evening.",
      "I spent quality time with my family.",
      "I practiced mindfulness meditation.",
    ],
  },
  {
    id: 3,
    date: "June 3, 2025",
    content: [
      "I completed a challenging coding task.",
      "I helped a friend with their project.",
      "I learned a new programming concept.",
      "I took a relaxing walk in the park.",
      "I cooked a delicious dinner.",
    ],
  },
  {
    id: 4,
    date: "June 4, 2025",
    content: [
      "I finished reading a book.",
      "I organized my workspace.",
      "I had a productive meeting at work.",
      "I exercised for 30 minutes.",
      "I spent quality time with my family.",
    ],
  },
];
*/

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const entries = await db.collection("entries").find().toArray();
    res.status(200).json({ entries });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

// Create a new entry (POST /api/entries)
router.post("/", async (req, res) => {
  const { date, content } = req.body;

  const newEntry = { date, content };

  try {
    const db = await connectToDatabase();
    const result = await db.collection("entries").insertOne(newEntry);
    const createdEntry = await db.collection("entries").findOne({ _id: result.insertedId });
    console.log("New entry created:", createdEntry);
    res.status(201).json({ entry: createdEntry });
  } catch (error) {
    console.error("Failed to create entry:", error);
    res.status(500).json({ error: "Failed to create entry" });
  }
});

// Update an entry (PUT /api/entries/:id)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const db = await connectToDatabase();
    const result = await db.collection("entries").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { content } },
      { returnOriginal: false }
    );

    if (!result.value) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.status(200).json({ entry: result.value });
  } catch (error) {
    res.status(500).json({ error: "Failed to update entry" });
  }
});

// Delete an entry (DELETE /api/entries/:id)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectToDatabase();
    const result = await db.collection("entries").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.status(200).json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
});

export default router;
