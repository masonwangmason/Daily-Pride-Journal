// Sample data for entries (replace this with your actual data fetching logic)
const entries = [
  {
    id: 1,
    date: "June 2, 2025",
    content: [
      "Today, I am proud of myself for completing my first project at work.",
      "I was able to finish it on time and my boss was very impressed with my work.",
      "I feel accomplished and motivated to take on more challenges in the future.",
      "I helped a colleague with their project.",
      "I received positive feedback from a client."
    ]
  },
  {
    id: 2,
    date: "June 1, 2025",
    content: [
      "I went for a run in the morning.",
      "I cooked a healthy meal for lunch.",
      "I read a book in the evening.",
      "I spent quality time with my family.",
      "I practiced mindfulness meditation."
    ]
  }
];

// Function to render entries
function renderEntries() {
  const historyCardDiv = document.getElementById("historySection");
  historyCardDiv.innerHTML = entries.map(
    (entry) => `
        <div class="historyCard">
            <h2>${entry.date}</h2>
            ${entry.content.map(item => `<p>${item}</p>`).join("")}
            <div class="btnContainer">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>`
  ).join(""); // Join the array of strings into a single string
}

// Call the renderEntries function to display the entries
renderEntries();
