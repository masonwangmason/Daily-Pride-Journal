import express from "express";
import entriesRouter from "./routes/entries.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/api/entries/", entriesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
