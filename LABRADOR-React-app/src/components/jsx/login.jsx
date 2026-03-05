import React from 'react'
import { useState } from 'react';
import "../css/login.css"
import { useNavigate } from 'react-router-dom';
const login = () => {
  const naviage = useNavigate();
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
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        naviage("/overview");
      } else {
        alert( data.message || "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
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
              {isLoading ? <span className="spinner"></span> : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default login