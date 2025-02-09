import express from "express";

const router = express.Router();

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

router.get("/", (req, res) => {
  console.log("GET /entries📓");
  res.status(200).json({ entries: entries });
});

// Create a new entry (POST /api/entries)
router.post("/", (req, res) => {
  const { date, content } = req.body;

  if (!date || !content) {
    return res.status(400).json({ error: "Date and content are required" });
  }

  const newEntry = {
    id: entries.length + 1,
    date,
    content,
  };

  entries.push(newEntry);
  res.status(201).json({ entry: newEntry });
});

// Delete an entry (DELETE /api/entries/:id)
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const entryIndex = entries.findIndex((entry) => entry.id === parseInt(id));

  if (entryIndex !== -1) {
    const deletedEntry = entries.splice(entryIndex, 1);
    res.status(200).json({ entry: deletedEntry[0] });
  } else {
    res.status(404).json({ error: "Entry not found" });
  }
});

export default router;
