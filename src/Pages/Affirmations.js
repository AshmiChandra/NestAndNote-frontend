import { useState } from "react";
import { Link } from "react-router-dom";

const defaults = [
  "I am doing the best I can, and that is enough.",
  "Small steps still move me forward.",
  "I am allowed to rest and begin again.",
  "My worth is not measured by my productivity.",
  "I can handle whatever today brings.",
  "I am growing at my own pace.",
  "Today, I choose calm over worry.",
  "I deserve kindness, especially from myself.",
];

function Affirmations() {
  const [all, setAll] = useState(defaults);
  const [index, setIndex] = useState(new Date().getDate() % defaults.length);
  const [favorites, setFavorites] = useState([]);
  const [custom, setCustom] = useState("");

  const current = all[index];
  const isFav = favorites.includes(current);

  const nextOne = () => {
    if (all.length < 2) return;
    let next = index;
    while (next === index) {
      next = Math.floor(Math.random() * all.length);
    }
    setIndex(next);
  };

  const toggleFav = () => {
    if (isFav) {
      setFavorites(favorites.filter((f) => f !== current));
    } else {
      setFavorites([...favorites, current]);
    }
  };

  const addCustom = (e) => {
    e.preventDefault();
    if (custom.trim() === "") return;
    setAll([...all, custom]);
    setIndex(all.length);
    setCustom("");
  };

  return (
    <div className="home">
      <Link to="/home" className="back-link">← Back</Link>
      <h2>Daily Affirmations</h2>
      <p className="subtitle">A kind word to start the day.</p>

      <div className="affirmation-card">
        <p className="affirmation-text">“{current}”</p>
        <div className="affirmation-actions">
          <button className="heart-btn" onClick={toggleFav}>
            {isFav ? "❤️ Saved" : "🤍 Save"}
          </button>
          <button className="soft-btn" onClick={nextOne}>New one</button>
        </div>
      </div>

      <form onSubmit={addCustom} className="inline-form affirmation-form">
        <input
          placeholder="Write your own affirmation..."
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h3>Favorites</h3>
      {favorites.length === 0 && (
        <p className="subtitle">Tap the heart on one you love.</p>
      )}
      {favorites.map((f) => (
        <div key={f} className="fav-row">
          <span>“{f}”</span>
          <button
            className="small-btn"
            onClick={() => setFavorites(favorites.filter((x) => x !== f))}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default Affirmations;