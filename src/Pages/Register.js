import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password });
      if (res.data === "Registration done") {
        navigate("/login");
      } else {
        setMessage(res.data);
      }
    } catch (err) {
      setMessage("Something went wrong. Try again later.");
    }
  };

    return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create your Nest</h2>
        <p className="subtitle">A calm place for your tasks, notes and habits.</p>
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
        <p className="message">{message}</p>
        <p className="switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
