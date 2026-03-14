import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

const Navbar = ({ activeView, setActiveView }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userType = localStorage.getItem("user_type"); // admin or student

const handleLogout = async () => {
  const confirmLogout = window.confirm("Are you sure you want to log out?");

  if (!confirmLogout) return;

  try {
    await logout();
    navigate("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  // Show full name if student
  let userName = "User";

  if (userType === "student") {
    userName = `${user?.last_name || ""}, ${user?.first_name || ""}`;
  } else {
    userName = user?.name || user?.email || "Admin";
  }

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="user-name">{userName}</span>
        <div className="user-avatar">{userInitial}</div>
      </div>

      <nav className="sidebar-nav">

        {/* Show only if admin */}
        {userType === "admin" && (
          <button
            className={`nav-item ${activeView === "adminpanel" ? "active" : ""}`}
            onClick={() => setActiveView("adminpanel")}
          >
            Admin Panel
          </button>
        )}

        <button
          className={`nav-item ${activeView === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveView("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`nav-item ${activeView === "program" ? "active" : ""}`}
          onClick={() => setActiveView("program")}
        >
          Program
        </button>

        <button
          className={`nav-item ${activeView === "subject" ? "active" : ""}`}
          onClick={() => setActiveView("subject")}
        >
          Subject
        </button>

      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Navbar;