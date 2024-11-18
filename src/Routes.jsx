import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import App from "./App.jsx";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<App />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
