import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import App from "./App.jsx";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import PgrPcmso from "./pages/PgrPcmso/PgrPcmso.jsx";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<App />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route path="/pgr-pcmso" element={<ProtectedRoute>
                  <PgrPcmso />
                </ProtectedRoute>} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
