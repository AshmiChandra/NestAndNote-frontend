import { useState } from "react";
import { Link } from "react-router-dom";

const defaultMantras = [
  "Dhum Durgaaya namaha",
  "Om Namah Shivaya",
  "Hare Krishna Hare Rama",
  "Om Namo Bhagavate Vasudevaya",
];

function Chanting() {
  const [mantras, setMantras] = useState(defaultMantras);
  const [selected, setSelected] = useState(defaultMantras[0]);
  const [target, setTarget] = useState(108);
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [custom, setCustom] = useState("");

  const done = count >= target;
  const percent = Math.min((count / target) * 100, 100);

  const tap = () => {
    if (done) return;
    setCount(count + 1);
  };

  const undo = () => {
    if (count > 0) setCount(count - 1);
  };

  const reset = () => setCount(0);

  const finishRound = () => {
    setRounds(rounds + 1);
    setCount(0);
  };

  const addMantra = (e) => {
    e.preventDefault();
    if (custom.trim() === "") return;
    setMantras([...mantras, custom]);
    setSelected(custom);
    setCustom("");
    setCount(0);
  };

  const changeMantra = (m) => {
    setSelected(m);
    setCount(0);
  };

  const changeTarget = (value) => {
    const n = parseInt(value, 10);
    if (!isNaN(n) && n > 0) {
      setTarget(n);
      setCount(0);
    }
  };

  return (
    <div className="home">
      <Link to="/home" className="back-link">← Back</Link>
      <h2>Chanting</h2>
      <p className="subtitle">Breathe in, and take it one repeat at a time.</p>

      <div className="mantra-chips">
        {mantras.map((m) => (
          <button
            key={m}
            className={m === selected ? "chip active" : "chip"}
            onClick={() => changeMantra(m)}
          >
            {m}
          </button>
        ))}
      </div>

      <form onSubmit={addMantra} className="inline-form chant-form">
        <input
          placeholder="Add your own mantra..."
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="chant-card">
        <p className="chant-mantra">{selected}</p>

        <div
          className="chant-ring"
          style={{
            background: `conic-gradient(var(--accent) ${percent}%, var(--border) 0)`,
          }}
        >
          <div className="chant-ring-inner">
            <span className="chant-count">{count}</span>
            <span className="chant-target">of {target}</span>
          </div>
        </div>

        {done ? (
          <>
            <p className="chant-done">Round complete 🪷</p>
            <button className="soft-btn" onClick={finishRound}>Start next round</button>
          </>
        ) : (
          <button className="chant-tap" onClick={tap}>Tap to chant</button>
        )}

        <div className="chant-controls">
          <button className="heart-btn" onClick={undo}>Undo</button>
          <button className="heart-btn" onClick={reset}>Reset</button>
          <label className="chant-target-input">
            Target
            <input
              type="number"
              min="1"
              value={target}
              onChange={(e) => changeTarget(e.target.value)}
            />
          </label>
        </div>

        <p className="subtitle">Rounds completed today: {rounds}</p>
      </div>
    </div>
  );
}

export default Chanting;