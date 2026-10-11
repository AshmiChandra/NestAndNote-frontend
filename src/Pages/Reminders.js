import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [now, setNow] = useState(new Date());

  // re-check the time every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const addReminder = (e) => {
    e.preventDefault();
    if (title.trim() === "" || when === "") return;
    setReminders([...reminders, { id: Date.now(), title, when, done: false }]);
    setTitle("");
    setWhen("");
  };

  const toggleDone = (id) => {
    setReminders(
      reminders.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const isOverdue = (r) => !r.done && new Date(r.when) <= now;

  const sorted = [...reminders].sort(
    (a, b) => new Date(a.when) - new Date(b.when)
  );

  const dueNow = reminders.filter(isOverdue);

  const format = (value) =>
    new Date(value).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="home">
      <Link to="/home" className="back-link">← Back</Link>
      <h2>Reminders</h2>
      <p className="subtitle">Gentle nudges, as you wished.</p>

      {dueNow.length > 0 && (
        <div className="due-banner">
          ⏰ {dueNow.length === 1 ? "1 reminder is" : `${dueNow.length} reminders are`} due:{" "}
          {dueNow.map((r) => r.title).join(", ")}
        </div>
      )}

      <form onSubmit={addReminder} className="reminder-form">
        <input
          placeholder="Remind me to..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="datetime-local"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="reminder-list">
        {sorted.length === 0 && (
          <p className="subtitle">No reminders yet. Add your first one above.</p>
        )}
        {sorted.map((r) => (
          <div
            key={r.id}
            className={isOverdue(r) ? "reminder-row overdue" : "reminder-row"}
          >
            <label className={r.done ? "item-text done" : "item-text"}>
              <input
                type="checkbox"
                checked={r.done}
                onChange={() => toggleDone(r.id)}
              />
              <span>
                <span className="reminder-title">{r.title}</span>
                <span className="reminder-time">
                  {format(r.when)}
                  {isOverdue(r) && " · due"}
                </span>
              </span>
            </label>
            <button className="small-btn" onClick={() => deleteReminder(r.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reminders;