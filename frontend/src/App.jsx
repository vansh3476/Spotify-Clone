import { AuthProvider } from "./context/authContext";
import Layout from "./layout";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoutes } from "./protectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout>
                  <Register />
                </Layout>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoutes>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer position="top-center" autoClose={4000} />
    </>
  );
}

export default App;
