import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import LoadingSpinner from "../common/LoadingSpinner";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePassword = () => setPasswordShown(!passwordShown);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Build credentials
      const credentials = studentNumber
        ? { email, student_number: studentNumber }
        : { email, password };

      // Call login from AuthProvider
      const data = await login(credentials);

      // Redirect based on user type
      if (data.type === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard"); // student dashboard
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">

      {/* Left Branding */}
      <div className="login-left-panel">
        <div className="branding-content">
          <div className="logo-icon"><img src="anemo.svg" alt="Logo" /></div>
          <h1 className="school-title">University Portal</h1>
          <p className="school-tagline">
            "Winds of knowledge, melodies of freedom." <br />
            Access your courses, connect with peers, and manage your student journey.
          </p>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="login-right-panel">
        <div className="login-container">
          <form onSubmit={handleLogin}>
            <h2>Portal Sign In</h2>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="name@umindanao.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password (Admins) */}
            <div className="form-group">
              <label>Password (Admins)</label>
              <input
                type={passwordShown ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // only required for admin login
                required={!studentNumber}
              />
            </div>

            {/* Student Number */}
            <div className="form-group">
              <label>Student Number (Students)</label>
              <input
                type="text"
                placeholder="2026-0001"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
              />
            </div>

            {/* Show Password */}
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="togglePassword"
                onChange={togglePassword}
              />
              <label htmlFor="togglePassword">Show Password</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={isLoading ? "loading" : ""}
            >
              {isLoading ? <LoadingSpinner /> : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;