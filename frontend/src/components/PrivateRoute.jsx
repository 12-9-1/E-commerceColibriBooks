import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; 

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
