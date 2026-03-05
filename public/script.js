const form = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesContainer = document.getElementById("notesContainer");
const API = " http://localhost:5000";

async function fetchNotes() {
  const res = await fetch(API);
  const notes = await res.json();
  renderNotes(notes);
}

function renderNotes(notes) {
  notesContainer.innerHTML = "";
  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small>${new Date(note.createdAt).toLocaleString()}</small><br/>
      <button onclick="deleteNote('${note._id}')">Delete</button>
    `;
    notesContainer.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const note = {
    title: titleInput.value,
    content: contentInput.value
  };
  await fetch("http://localhost:5000/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  });
  titleInput.value = "";
  contentInput.value = "";
  fetchNotes();
});

async function deleteNote(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchNotes();
}

fetchNotes();
