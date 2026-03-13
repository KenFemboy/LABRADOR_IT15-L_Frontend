import React from 'react'
import { useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
const login = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };


const handleLogin = async(e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("auth_token", data.token);  // Changed from "token"
      localStorage.setItem("user", JSON.stringify(data.user));  // Store user
      navigate("/dashboard");
    } else {
      setError(data.message || "Invalid credentials, please try again.");
      setIsLoading(false);
    }
  } catch (error) {
    setError("Login failed: " + error.message);
    setIsLoading(false);
  }
}
  
  return (
    <div className="login-page-wrapper">

      {/* Left Side: School Branding & Design */}
      <div className="login-left-panel">
        <div className="branding-content">
          <div className="logo-icon">🎓</div>
          <h1 className="school-title">University Portal</h1>
          <p className="school-tagline">
            "Winds of knowledge, melodies of freedom." <br />
            Access your courses, connect with peers, and manage your student journey.
          </p>
        </div>
      </div>

      {/* Right Side: Floating Login Form */}
      <div className="login-right-panel">
        <div className="login-container">
          <form onSubmit={handleLogin}>
            <h2>Student Sign In</h2>
          {error && <div className="error-message">{error}</div>}

            <p className="subtitle">Please enter your university credentials.</p>

            <div className="form-group">
              <label htmlFor="email">University Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="name@umindanao.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="togglePassword"
                  onChange={() => setPasswordShown(!passwordShown)}
                />
                <label htmlFor="togglePassword">Show Password</label>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className={isLoading ? 'loading' : ''}>
              {isLoading ? <LoadingSpinner /> : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default login