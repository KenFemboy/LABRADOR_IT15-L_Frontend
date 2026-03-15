import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import { AuthProvider } from "./hooks/useAuth.jsx";
import ErrorBoundary from "./components/common/Errorboundary.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Only accessible if NOT logged in */}
          <Route
            path="/"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          {/* Only accessible if logged in */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch ALL unknown routes */}
          <Route path="*" element={<ErrorBoundary />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;