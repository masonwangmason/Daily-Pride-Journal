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
                <button class="delete-btn" data-id="${entry.id}">Delete</button>
            </div>
        </div>`
  ).join("");

  // Attach event listeners to edit delete buttons
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", handleDelete);
  });
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

// Function to handle entry deletion
async function handleDelete(event) {
  const id = event.target.getAttribute("data-id");

  try{
    const res = await fetch(`api/entries/${id}`, {
      method: "DELETE"
    });

    console.log("Delete response:", res);

    const data = await res.json();
    console.log("Entry to be deleted:", data);

    entries = entries.filter(entry => entry.id !== parseInt(id));
    console.log("Entry Deleted");
    renderEntries();
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
}

// Initial fetch of entries
getEntries();
