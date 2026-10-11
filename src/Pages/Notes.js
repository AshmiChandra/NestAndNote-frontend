import { useState } from "react";
import { Link } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([
    { id: 1, text: "Welcome! Write anything you want to remember." },
  ]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    if (editingId) {
      setNotes(notes.map((n) => (n.id === editingId ? { ...n, text } : n)));
      setEditingId(null);
    } else {
      setNotes([{ id: Date.now(), text }, ...notes]);
    }
    setText("");
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setText(note.text);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (id === editingId) {
      setEditingId(null);
      setText("");
    }
  };

  return (
    <div className="home">
      <Link to="/home" className="back-link">← Back</Link>
      <h2>Notes to Self</h2>
      <p className="subtitle">Quick thoughts, saved safely.</p>

      <form onSubmit={handleSubmit} className="note-form">
        <textarea
          placeholder="Write a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
        <button type="submit">{editingId ? "Save changes" : "Add note"}</button>
      </form>

      <div className="notes-grid">
        {notes.length === 0 && <p className="subtitle">No notes yet.</p>}
        {notes.map((n) => (
          <div key={n.id} className="note-card">
            <p>{n.text}</p>
            <div className="note-actions">
              <button className="small-btn" onClick={() => startEdit(n)}>Edit</button>
              <button className="small-btn" onClick={() => deleteNote(n.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;