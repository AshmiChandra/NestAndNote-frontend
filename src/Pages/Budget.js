import { useState } from "react";
import { Link } from "react-router-dom";

const CURRENCY = "₹";

const categories = ["Food", "Transport", "Shopping", "Bills", "Health", "Fun", "Other"];

function Budget() {
  const [entries, setEntries] = useState([
    { id: 1, type: "income", title: "Pocket money", amount: 5000, category: "Other" },
    { id: 2, type: "expense", title: "Lunch with friends", amount: 350, category: "Food" },
  ]);
  const [type, setType] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [filter, setFilter] = useState("all");

  const addEntry = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (title.trim() === "" || isNaN(value) || value <= 0) return;
    setEntries([
      { id: Date.now(), type, title, amount: value, category },
      ...entries,
    ]);
    setTitle("");
    setAmount("");
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((en) => en.id !== id));
  };

  const income = entries
    .filter((en) => en.type === "income")
    .reduce((sum, en) => sum + en.amount, 0);
  const spent = entries
    .filter((en) => en.type === "expense")
    .reduce((sum, en) => sum + en.amount, 0);
  const balance = income - spent;

  const visible = entries.filter((en) => filter === "all" || en.type === filter);

  const byCategory = categories
    .map((c) => ({
      name: c,
      total: entries
        .filter((en) => en.type === "expense" && en.category === c)
        .reduce((sum, en) => sum + en.amount, 0),
    }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);

  const money = (n) => `${CURRENCY}${n.toLocaleString()}`;

  return (
    <div className="home">
      <Link to="/home" className="back-link">← Back</Link>
      <h2>Budget Tracker</h2>
      <p className="subtitle">Keep an eye on what comes and goes.</p>

      <div className="summary-row">
        <div className="summary-card">
          <span className="summary-label">Income</span>
          <span className="summary-value green">{money(income)}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Spent</span>
          <span className="summary-value red">{money(spent)}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Balance</span>
          <span className={balance >= 0 ? "summary-value green" : "summary-value red"}>
            {money(balance)}
          </span>
        </div>
      </div>

      <form onSubmit={addEntry} className="budget-form">
        <div className="type-toggle">
          <button
            type="button"
            className={type === "expense" ? "chip active" : "chip"}
            onClick={() => setType("expense")}
          >
            Expense
          </button>
          <button
            type="button"
            className={type === "income" ? "chip active" : "chip"}
            onClick={() => setType("income")}
          >
            Income
          </button>
        </div>
        <input
          placeholder="What was it for?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit" className="budget-add">Add</button>
      </form>

      {byCategory.length > 0 && (
        <div className="breakdown">
          <h3>Where it went</h3>
          {byCategory.map((c) => (
            <div key={c.name} className="bar-row">
              <span className="bar-name">{c.name}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${(c.total / spent) * 100}%` }}
                />
              </div>
              <span className="bar-amount">{money(c.total)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="filter-row">
        {["all", "expense", "income"].map((f) => (
          <button
            key={f}
            className={filter === f ? "chip active" : "chip"}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f === "expense" ? "Expenses" : "Income"}
          </button>
        ))}
      </div>

      <div className="entries">
        {visible.length === 0 && <p className="subtitle">Nothing here yet.</p>}
        {visible.map((en) => (
          <div key={en.id} className="entry-row">
            <div>
              <div className="entry-title">{en.title}</div>
              <div className="entry-cat">{en.category}</div>
            </div>
            <div className="entry-right">
              <span className={en.type === "income" ? "green" : "red"}>
                {en.type === "income" ? "+" : "−"}
                {money(en.amount)}
              </span>
              <button className="small-btn" onClick={() => deleteEntry(en.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Budget;