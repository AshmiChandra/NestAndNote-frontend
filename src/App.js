import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ModulePage from "./Pages/ModulePage";
import EverydayLists from "./Pages/EverydayLists";
import Notes from "./Pages/Notes";
import Affirmations from "./Pages/Affirmations";
import Chanting from "./Pages/Chanting";
import Habits from "./Pages/Habits";
import Budget from "./Pages/Budget";
import Reminders from "./Pages/Reminders";
import ProtectedRoute from "./ProtectedRoute";
import { modules } from "./modules";

function App() {
  const built = {
    "/lists": <EverydayLists />,
    "/notes": <Notes />,
    "/affirmations": <Affirmations />,
    "/chanting": <Chanting />,
    "/habits": <Habits />,
    "/budget": <Budget />,
    "/reminders": <Reminders />,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {modules.map((m) => (
          <Route
            key={m.path}
            path={m.path}
            element={
              <ProtectedRoute>
                {built[m.path] || <ModulePage title={m.title} />}
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;