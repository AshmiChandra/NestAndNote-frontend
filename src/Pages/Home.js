import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h2>Hi, {user ? user.name : "there"} 👋</h2>
      <p>Your modules will show up here.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;