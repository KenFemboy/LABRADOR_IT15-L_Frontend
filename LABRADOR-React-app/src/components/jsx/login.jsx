import React from 'react'
import { useState } from 'react';
import "../css/login.css"
const login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a business API call (2 seconds)
    setTimeout(() => {
      setIsLoading(false);
      alert("Login successful!");
      window.location.reload();
    }, 2000);


  };
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
          <form onSubmit={handleSubmit}>
            <h2>Student Sign In</h2>
            <p className="subtitle">Please enter your university credentials.</p>

            <div className="form-group">
              <label htmlFor="email">University Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="name@umindanao.edu.ph"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder="••••••••"
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