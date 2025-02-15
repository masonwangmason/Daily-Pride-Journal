console.log("Quote page script loaded!");

let quotes = [];
const quotesSection = document.getElementById("quotesSection");

async function getQuotes() {
  const res = await fetch("/api/quotes");
  const data = await res.json();
  console.log("Got quotes", data);
  quotes = data.quotes;
    
  renderQuotes();
}

async function renderQuotes() {
  quotesSection.innerHTML = quotes.slice().reverse().map(
    (quote) => `
        <div class="quoteCard" data-id="${quote._id}">
            <div class="view-mode">
                <h2>${quote.author}</h2>
                <p>${quote.content}</p>
                <div class="btnContainer">
                    <button class="edit-btn" data-id="${quote._id}">Edit</button>
                    <button class="delete-btn" data-id="${quote._id}">Delete</button>
                </div>
            </div>
            <div class="edit-mode">
                <input class="edit-author" value="${quote.author}">
                <textarea class="edit-quote">${quote.content}</textarea>
                <div class="btnContainer">
                    <button class="save-btn" data-id="${quote._id}">Save</button>
                    <button class="cancel-btn" data-id="${quote._id}">Cancel</button>
                </div>
            </div>
        </div>`
  ).join("");

  
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", handleDelete);
  });
  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", toggleEditMode);
  });
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
  const card = document.querySelector(`.quoteCard[data-id="${entryId}"]`);
  const viewMode = card.querySelector(".view-mode");
  const editMode = card.querySelector(".edit-mode");

  if (viewMode.style.display === "none") {
    viewMode.style.display = "block";
    editMode.style.display = "none";
  } else {
    viewMode.style.display = "none";
    editMode.style.display = "block";
  }
}

// Function to handle save button click
async function handleSave(event) {
  const quoteId = event.target.getAttribute("data-id");
  const card = document.querySelector(`.quoteCard[data-id="${quoteId}"]`);
  if (!card) {
    console.error(`Card with ID ${quoteId} not found`);
    return;
  }
  const author = card.querySelector(".edit-author").value;
  const content = card.querySelector(".edit-quote").value;
  const newContent = { author, content };
  console.log("Saving new content:", newContent);

  try {
    const res = await fetch(`/api/quotes/${quoteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newContent)
    });

    if (!res.ok) {
      console.log("Response status:", res.status);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Updated quote", data);

    // After successful update, fetch the latest quotes
    await getQuotes(); // This will update the quotes array and re-render the UI

    // Toggle back to view mode
    const viewMode = card.querySelector(".view-mode");
    const editMode = card.querySelector(".edit-mode");
    viewMode.style.display = "block";
    editMode.style.display = "none";

  } catch (error) {
    console.error("Failed to update quote:", error);
  }
}


async function handleNewQuote(event) {
  event.preventDefault();

  const author = document.getElementById("authorEntry").value;
  const content = document.getElementById("quoteEntry").value;

  try {
    const res = await fetch ("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, content })
    });

    const data = await res.json();
    console.log("New quote created:", data.quote);
    quotes.push(data.quote); // Add the new quote to the quotes array
    renderQuotes(); // Re-render the quotes
  } catch (error) {
    console.error("Failed to create quote:", error);
  } 
}

async function handleDelete(event) {
  const quoteId = event.target.getAttribute("data-id");
  console.log("Deleting quote with id", quoteId);

  try {
    const res = await fetch(`/api/quotes/${quoteId}`, {
      method: "DELETE"
    });

    const data = await res.json();
    console.log("Quote deleted:", data);

    quotes = quotes.filter(quote => quote._id !== quoteId);
    console.log("Quote deleted");
    renderQuotes();
  } catch (error) {
    console.error("Failed to delete quote:", error);
  }
}

// Attach the form submission handler
document.getElementById("newQuoteForm").addEventListener("submit", handleNewQuote);

getQuotes();