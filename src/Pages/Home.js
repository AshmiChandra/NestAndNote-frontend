import { useNavigate, Link } from "react-router-dom";
import { modules } from "../modules";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <h2>Hi, {user ? user.name : "there"} 👋</h2>
          <p className="subtitle">What would you like to do today?</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <div className="module-grid">
        {modules.map((m) => (
          <Link to={m.path} key={m.path} className="module-card">
            <span className="module-icon">{m.icon}</span>
            <h3>{m.title}</h3>
            <p>{m.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;