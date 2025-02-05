console.log("Client side javascript file is loaded!");

function loadRenderHistory(){
  let entries = [];
  const historySection = document.getElementById("historySection");

  async function getEntries() {
    const res = await fetch("/api/entries");
    const data  = await res.json();
    console.log("Got entries", data);
    entries = data.entries;

    renderEntries();
  }

  // Function to render entries
  function renderEntries() {
    historySection.innerHTML = entries.map(
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

  getEntries();
}

loadRenderHistory();