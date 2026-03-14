import { useState, useContext, createContext } from "react";
import api from "../services/api";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [userType, setUserType] = useState(localStorage.getItem("user_type"));
  const [loading, setLoading] = useState(false);

  // LOGIN
  const login = async (credentials) => {
    try {
      setLoading(true);

      const endpoint = credentials.student_number
        ? "/student/login"
        : "/admin/login";

      const response = await api.post(endpoint, credentials);

      const loggedUser = response.data.user || response.data.student;

      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("user_type", response.data.type);

      setToken(response.data.token);
      setUser(loggedUser);
      setUserType(response.data.type);

      return response.data;

    } catch (error) {
      console.error("Login error:", error.response?.data);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      if (token) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
      }

    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_type");

    setUser(null);
    setToken(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userType,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};