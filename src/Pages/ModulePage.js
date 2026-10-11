import { Link } from "react-router-dom";

function ModulePage({ title }) {
  return (
    <div className="home">
      <Link to="/home" className="back-link">← Back</Link>
      <h2>{title}</h2>
      <p className="subtitle">Coming soon.</p>
    </div>
  );
}

export default ModulePage;