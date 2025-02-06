console.log("History page script loaded!");

let entries = [];
const historySection = document.getElementById("historySection");
const historyWelcome = document.getElementById("historyWelcome");

// Function to get entries from the server
async function getEntries() {
  const res = await fetch("/api/entries");
  const data = await res.json();
  console.log("Got entries", data);
  entries = data.entries;

  renderWelcome();
  renderEntries();
}

// Function to render history entries
function renderEntries() {
  historySection.innerHTML = entries.slice().reverse().map(
    (entry) => `
        <div class="historyCard">
            <h2>${entry.date}</h2>
            ${entry.content.map(item => `<p>${item}</p>`).join("")}
            <div class="btnContainer">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>`
  ).join("");
}

// Function to render history welcome message
function renderWelcome() {
  if (entries.length === 0) {
    historyWelcome.innerHTML = "<h2>No entries found. Start by adding one!</h2>";
  } else {
    historyWelcome.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You've recorded ${entries.length} entries so far. Keep up the good work!</p>`;
  }
}

// Initial fetch of entries
getEntries();
