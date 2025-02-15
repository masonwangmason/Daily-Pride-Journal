import express from "express";
import { connectToDatabase } from "../config/db.js";

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

export default router;