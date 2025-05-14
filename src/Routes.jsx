import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import App from "./App.jsx";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import PgrPcmso from "./pages/PgrPcmso/PgrPcmso.jsx";
import SendEmail from "./pages/SendEmail/SendEmail.jsx";
import CreateLtcat from "./pages/CreateDocs/CreateLtcat/CreateLtcat.jsx";
import CreateCert from "./pages/CreateDocs/Cert35/Cert35.jsx";
import ImportLtcat from "./pages/CreateDocs/ImportLtcat.jsx/ImportLtcat.jsx";
import Cert06 from "./pages/CreateDocs/Cert06/Cert06.jsx";
import CertPgr from "./pages/CreateDocs/CertPgr/CertPgr,.jsx";
import CompleTxt from "./pages/CreateTxt/CompleTxt.jsx";
import Cert05 from "./pages/CreateDocs/Cert05/Cert05.jsx";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<App />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/pgr-pcmso"
              element={
                <ProtectedRoute>
                  <PgrPcmso />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-ltcat"
              element={
                <ProtectedRoute>
                  <CreateLtcat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/import-ltcat"
              element={
                <ProtectedRoute>
                  <ImportLtcat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cert-nr35"
              element={
                <ProtectedRoute>
                  <CreateCert />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cert-nr06"
              element={
                <ProtectedRoute>
                  <Cert06 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cert-nr05"
              element={
                <ProtectedRoute>
                  <Cert05 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cert-pgr"
              element={
                <ProtectedRoute>
                  <CertPgr />
                </ProtectedRoute>
              }
            />
            <Route
              path="/send-email"
              element={
                <ProtectedRoute>
                  <SendEmail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/text-comple"
              element={
                <ProtectedRoute>
                  <CompleTxt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
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
