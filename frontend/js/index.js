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

  try {
    const res = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry)
    });

    const data = await res.json();
    console.log(data);
    console.log("New entry created:", data.entry);
  } catch (error) {
    console.error("Failed to create entry:", error);
  }
};

// Function to render a random quote
async function renderRandomQuote() {
  try {
    const res = await fetch("/api/quotes/random");
    const data = await res.json();
    console.log(data);
    const quote = data.quote;
    console.log("Random quote:", quote);

    const quoteContainer = document.getElementById("quoteContainer");
    quoteContainer.innerHTML = `<p class="quoteText">"${quote.content}"</p><p class="quoteAuthor">- ${quote.author}</p>`;
  } catch (error) {
    console.error("Failed to fetch random quote:", error);
  }
}

// Attach the form submission handler
document.getElementById("newEntryForm").addEventListener("submit", handleNewEntry);

// Set the current date
setCurrentDate();

// render a random quote
renderRandomQuote();