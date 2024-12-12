import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Mostrar carregamento até que o estado seja definido
  if (loading) {
    return <div>Carregando...</div>; // Customize como desejar
  }

  const publicPaths = ["/login", "/signup"];
  if (publicPaths.includes(location.pathname)) {
    return children;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
