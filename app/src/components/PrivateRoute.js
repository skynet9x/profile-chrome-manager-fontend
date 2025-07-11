import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    return <Navigate to="/login" />;
  }
  return children;
}