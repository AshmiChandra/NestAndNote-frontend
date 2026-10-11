import { Navigate } from "react-router-dom";

// Set to true once the backend login works.
// While false, every page is open (handy for building and testing).
const REQUIRE_LOGIN = false;

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  if (REQUIRE_LOGIN && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;