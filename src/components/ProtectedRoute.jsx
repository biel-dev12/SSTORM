import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Permitir acesso livre às páginas de login e signup
  const publicPaths = ["/login", "/signup"];
  if (publicPaths.includes(location.pathname)) {
    return children;
  }

  // Bloquear outras rotas se não estiver logado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
