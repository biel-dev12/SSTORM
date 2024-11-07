// Route.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} /> 
          <Route path="login" element={<Login />} /> 
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
