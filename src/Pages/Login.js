import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setMessage("Invalid email or password");
      } else {
        setMessage("Something went wrong. Is the backend running?");
      }
    }
  };

  return (
    <div>
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <p>New here? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;