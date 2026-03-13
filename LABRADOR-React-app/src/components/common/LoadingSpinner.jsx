import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner" aria-label="loading"></div>
    </div>
  );
};

export default LoadingSpinner;