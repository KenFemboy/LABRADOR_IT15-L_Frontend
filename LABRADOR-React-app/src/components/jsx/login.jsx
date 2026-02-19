import React from 'react'
import { useState } from 'react';
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
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <h2>Welcome Back</h2>
            <p className="subtitle">Please enter your corporate credentials.</p>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="name@company.com" required />
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
              {isLoading ? <span className="spinner"></span> : "Sign In"}
            </button>
          </form>
        </div>
      );
}

export default login