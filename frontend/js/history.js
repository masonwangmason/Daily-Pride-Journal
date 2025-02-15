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

// Function to render history welcome message
function renderWelcome() {
  if (entries.length === 0) {
    historyWelcome.innerHTML = "<h2>Oops...No entries found. Start by adding one!</h2>";
  } else {
    historyWelcome.innerHTML = `
        <h2 class="welcome-title">Congratulations!</h2>
        <p>You've recorded ${entries.length} entries so far. Keep up the good work!</p>`;
  }
}

// Function to render history entries
function renderEntries() {
  historySection.innerHTML = entries.slice().reverse().map(
    (entry) => `
        <div class="historyCard" data-id="${entry._id}">
            <div class="view-mode">
                <h2>${entry.date}</h2>
                ${entry.content.map(item => `<p>${item}</p>`).join("")}
                <div class="btnContainer">
                    <button class="edit-btn" data-id="${entry._id}">Edit</button>
                    <button class="delete-btn" data-id="${entry._id}">Delete</button>
                </div>
            </div>
            <div class="edit-mode">
                <textarea class="edit-content">${entry.content[0] ? entry.content[0] : ""}</textarea>
                <textarea class="edit-content">${entry.content[1] ? entry.content[1] : ""}</textarea>
                <textarea class="edit-content">${entry.content[2] ? entry.content[2] : ""}</textarea>
                <textarea class="edit-content">${entry.content[3] ? entry.content[3] : ""}</textarea>
                <textarea class="edit-content">${entry.content[4] ? entry.content[4] : ""}</textarea>
                <div class="btnContainer">
                    <button class="save-btn" data-id="${entry._id}">Save</button>
                    <button class="cancel-btn" data-id="${entry._id}">Cancel</button>
                </div>
            </div>
        </div>`
  ).join("");

  // Attach event listeners to delete & edit buttons
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", handleDelete);
  });
  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", toggleEditMode);
  });

  // Attach event listeners to save and cancel buttons
  document.querySelectorAll(".save-btn").forEach(button => {
    button.addEventListener("click", handleSave);
  });
  document.querySelectorAll(".cancel-btn").forEach(button => {
    button.addEventListener("click", toggleEditMode);
  });
}

// Function to toggle edit mode
function toggleEditMode(event) {
  const entryId = event.target.getAttribute("data-id");
  const card = document.querySelector(`.historyCard[data-id="${entryId}"]`);
  const viewMode = card.querySelector(".view-mode");
  const editMode = card.querySelector(".edit-mode");

  if (viewMode.style.display === "none") {
    viewMode.style.display = "block";
    editMode.style.display = "none";
  } else {
    viewMode.style.display = "none";
    editMode.style.display = "flex";
  }
}

// Function to handle save button click
async function handleSave(event) {
  const entryId = event.target.getAttribute("data-id");
  const card = document.querySelector(`.historyCard[data-id="${entryId}"]`);
  const textareas = card.querySelectorAll(".edit-content");
  const newContent = Array.from(textareas).map(textarea => textarea.value.trim());

  try {
    const res = await fetch(`/api/entries/${entryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: newContent })
    });

    // Add response status check
    if (!res.ok) {
      console.log("Response status:", res.status); // Add debug log
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Updated entry", data);

    // After successful update, fetch the latest entries
    await getEntries(); // This will update the entries array and re-render the UI

    // Toggle back to view mode
    const viewMode = card.querySelector(".view-mode");
    const editMode = card.querySelector(".edit-mode");
    viewMode.style.display = "block";
    editMode.style.display = "none";

  } catch (error) {
    console.error("Failed to update entry:", error);
  }
}

// Function to handle entry deletion
async function handleDelete(event) {
  const id = event.target.getAttribute("data-id");
  console.log("Delete button clicked for entry:", id);

  try{
    const res = await fetch(`api/entries/${id}`, {
      method: "DELETE"
    });

    console.log("Delete response:", res);

    const data = await res.json();
    console.log("Entry deleted:", data);

    entries = entries.filter(entry => entry._id !== id);
    console.log("Entry Deleted");
    renderEntries();
    renderWelcome();
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
}

// Initial fetch of entries
getEntries();
