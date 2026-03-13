import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/auth/login.jsx"
import Dashboard from './components/dashboard/Dashboard.jsx'
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './hooks/useAuth.jsx';

import './App.css'

function App() {
  return (
   <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
