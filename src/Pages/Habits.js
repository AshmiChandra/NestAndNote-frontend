import { useState } from "react";
import { Link } from "react-router-dom";

// local date as YYYY-MM-DD
const dateKey = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

const today = dateKey(new Date());

const getStreak = (days) => {
  let streak = 0;
  // if today isn't done yet, start counting from yesterday
  let start = days.includes(today) ? 0 : 1;
  while (days.includes(dateKey(daysAgo(start + streak)))) {
    streak++;
  }
  return streak;
};

function Habits() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Morning walk", days: [dateKey(daysAgo(1)), dateKey(daysAgo(2))] },
    { id: 2, name: "Read 10 pages", days: [] },
  ]);
  const [newHabit, setNewHabit] = useState("");
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(8);

  const addHabit = (e) => {
    e.preventDefault();
    if (newHabit.trim() === "") return;
    setHabits([...habits, { id: Date.now(), name: newHabit, days: [] }]);
    setNewHabit("");
  };

  const toggleToday = (id) => {
    setHabits(
      habits.map((h) => {
        if (h.id !== id) return h;
        const done = h.days.includes(today);
        return {
          ...h,
          days: done ? h.days.filter((d) => d !== today) : [...h.days, today],
        };
      })
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const last7 = [6, 5, 4, 3, 2, 1, 0].map((n) => daysAgo(n));

  const changeGoal = (value) => {
    const n = parseInt(value, 10);
    if (!isNaN(n) && n > 0) setGoal(n);
  };

  return (
    <div className="home">
      <Link to="/home" className="back-link">← Back</Link>
      <h2>Habit Tracker</h2>
      <p className="subtitle">Small habits, one day at a time.</p>

      <div className="water-card">
        <h3>💧 Water intake</h3>
        <div className="glass-row">
          {Array.from({ length: Math.max(goal, glasses) }).map((_, i) => (
            <span key={i} className={i < glasses ? "glass filled" : "glass"}>
              🥛
            </span>
          ))}
        </div>
        <p className="water-text">
          {glasses} of {goal} glasses
          {glasses >= goal && " — goal reached! 🎉"}
        </p>
        <div className="water-controls">
          <button className="heart-btn" onClick={() => setGlasses(Math.max(0, glasses - 1))}>−</button>
          <button className="soft-btn" onClick={() => setGlasses(glasses + 1)}>+ Add a glass</button>
          <label className="chant-target-input">
            Goal
            <input
              type="number"
              min="1"
              value={goal}
              onChange={(e) => changeGoal(e.target.value)}
            />
          </label>
        </div>
      </div>

      <form onSubmit={addHabit} className="inline-form habit-form">
        <input
          placeholder="Add a new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {habits.length === 0 && (
        <p className="subtitle">No habits yet. Add your first one above.</p>
      )}

      {habits.map((h) => {
        const doneToday = h.days.includes(today);
        const streak = getStreak(h.days);
        return (
          <div key={h.id} className="habit-card">
            <div className="habit-top">
              <label className={doneToday ? "item-text done" : "item-text"}>
                <input
                  type="checkbox"
                  checked={doneToday}
                  onChange={() => toggleToday(h.id)}
                />
                {h.name}
              </label>
              <button className="small-btn" onClick={() => deleteHabit(h.id)}>✕</button>
            </div>
            <div className="habit-bottom">
              <div className="week-strip">
                {last7.map((d) => {
                  const key = dateKey(d);
                  return (
                    <div key={key} className="week-day">
                      <span className="week-label">
                        {d.toLocaleDateString("en-US", { weekday: "narrow" })}
                      </span>
                      <span className={h.days.includes(key) ? "dot on" : "dot"} />
                    </div>
                  );
                })}
              </div>
              <span className="streak">
                {streak > 0 ? `🔥 ${streak} day${streak > 1 ? "s" : ""}` : "No streak yet"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Habits;