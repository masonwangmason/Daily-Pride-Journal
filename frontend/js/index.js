console.log("Index page script loaded!");


let newDateInput = "";

// Helper function to get the current date in desired format
function setCurrentDate() {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  newDateInput = today.toLocaleDateString("en-US", options);
}

// Function to handle new entry submission
async function handleNewEntry(event) {
  event.preventDefault();

  const newContent = [
    document.getElementById("journalEntry1").value,
    document.getElementById("journalEntry2").value,
    document.getElementById("journalEntry3").value,
    document.getElementById("journalEntry4").value,
    document.getElementById("journalEntry5").value
  ];

  const newEntry = { date: newDateInput, content: newContent };

  const res = await fetch("/api/entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEntry)
  });

  const data = await res.json();
  console.log("New entry created:", data.entry);
}

// Attach the form submission handler
document.getElementById("newEntryForm").addEventListener("submit", handleNewEntry);

// Set the current date
setCurrentDate();
