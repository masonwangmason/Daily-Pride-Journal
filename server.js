import express from "express";
import path from "path";

const PORT = process.env.PORT || 3000;

const app = express();
const __dirname = path.resolve();

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
