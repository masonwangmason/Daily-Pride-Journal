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
  quotesSection.innerHTML = quotes.map(
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
  /*
  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", handleEdit);
  });
  document.querySelectorAll(".save-btn").forEach(button => {
    button.addEventListener("click", handleSave);
  });
  document.querySelectorAll(".cancel-btn").forEach(button => {
    button.addEventListener("click", handleCancel);
  });
  */
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


getQuotes();