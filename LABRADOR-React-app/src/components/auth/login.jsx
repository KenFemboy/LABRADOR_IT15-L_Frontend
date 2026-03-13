import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";

const Login = () => {
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentNumber, setStudentNumber] = useState(""); // ✅ added

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // decide endpoint
      const endpoint = studentNumber ? "/student/login" : "/admin/login";

      const bodyData = studentNumber
        ? { email, student_number: studentNumber }
        : { email, password };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.user || data.student)
        );
        localStorage.setItem("user_type", data.type);

        if (data.type === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      } else {
        setError(data.message || "Invalid credentials.");
        setIsLoading(false);
      }
    } catch (error) {
      setError("Login failed: " + error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">

      {/* Left Side */}
      <div className="login-left-panel">
        <div className="branding-content">
          <div className="logo-icon">🎓</div>
          <h1 className="school-title">University Portal</h1>
          <p className="school-tagline">
            "Winds of knowledge, melodies of freedom." <br />
            Access your courses, connect with peers, and manage your journey.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-right-panel">
        <div className="login-container">
          <form onSubmit={handleLogin}>
            <h2>Portal Sign In</h2>

            {error && <div className="error-message">{error}</div>}

            <p className="subtitle">
              Enter your credentials to access the dashboard.
            </p>

            {/* Email */}
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
                onChange={() => setPasswordShown(!passwordShown)}
              />
              <label htmlFor="togglePassword">Show Password</label>
            </div>

            {/* Submit */}
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