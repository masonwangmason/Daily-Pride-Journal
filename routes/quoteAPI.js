import express from "express";
import { connectToDatabase } from "../config/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const quotes = await db.collection("quotes").find().toArray();
    res.status(200).json({ quotes });
  } catch (error) {
    console.error("Failed to fetch entries:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectToDatabase();
    const result = await db.collection("quotes").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Quote not found" });
    }

    res.status(200).json({ message: "Quote deleted" });

  } catch (error) {
    console.error("Failed to delete entry:", error);
    res.status(500).json({ message: "Failed to delete entry" });
  }
});


export default router;