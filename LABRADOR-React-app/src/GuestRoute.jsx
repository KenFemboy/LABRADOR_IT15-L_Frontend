import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.jsx";

const GuestRoute = ({ children }) => {
  const { user } = useAuth();

  // If the user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render the children (login page)
  return children;
};

export default GuestRoute;