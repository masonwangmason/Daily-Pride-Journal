import express from "express";
import entriesRouter from "./routes/entries.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded ({ extended: false }));
app.use(cookieParser());

// API endpoint for entries
app.use("/api/entries", entriesRouter);

// Serve static files from the "frontend"
app.use(express.static("frontend"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
