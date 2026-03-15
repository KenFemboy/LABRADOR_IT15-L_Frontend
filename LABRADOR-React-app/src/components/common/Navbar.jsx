import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

const Navbar = ({ activeView, setActiveView }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userType = localStorage.getItem("user_type");

  useEffect(() => {
    if (!user) return;
    if (userType === "student") {
      setActiveView("dashboard");
    } else if (userType === "admin") {
      setActiveView("admin");
    }
  }, [user, userType, setActiveView]);

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userName = userType === "student" 
    ? `${user?.last_name || ""}, ${user?.first_name || ""}`
    : user?.name || user?.email || "Admin";

  const userInitial = userName.charAt(0).toUpperCase();

  // Reusable Nav Item Component for cleaner code
  const NavItem = ({ view, label }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`
        w-full flex items-center px-6 py-3.5 my-1 text-sm font-medium transition-all duration-200 group
        ${activeView === view 
          ? "bg-[var(--primary-teal)] text-white border-l-4 border-[var(--accent-gold)] shadow-lg" 
          : "text-[var(--bg-cream)] opacity-70 hover:opacity-100 hover:bg-white/5"}
      `}
    >
      <span className={activeView === view ? "translate-x-1 transition-transform" : ""}>
        {label}
      </span>
    </button>
  );

  return (
    <aside className="w-64 h-screen flex flex-col bg-[var(--secondary-green)] border-r border-white/10 sticky top-0">
      
      {/* Sidebar Header: User Profile */}
      <div className="p-6 mb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="
            w-12 h-12 flex items-center justify-center rounded-full 
            bg-[var(--primary-teal)] border-2 border-[var(--accent-gold)] 
            text-white font-bold text-xl shadow-[0_0_15px_var(--anemo-glow)]
          ">
            {userInitial}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[var(--bg-cream)] font-bold text-sm truncate">
              {userName}
            </span>
            <span className="text-[var(--anemo-glow)] text-[10px] uppercase tracking-widest font-bold opacity-80">
              {userType}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {userType === "admin" && (
          <>
            <NavItem view="admin" label="Admin Panel" />
            <NavItem view="students" label="Student Records" />
          </>
        )}

        {userType === "student" && (
          <>
            <NavItem view="dashboard" label="Dashboard" />
            <NavItem view="information" label="Information" />
            <NavItem view="courses" label="Courses" />
          </>
        )}
        
        <div className="my-4 border-t border-white/5 mx-4" /> {/* Divider */}
        
        <NavItem view="weather" label="Weather" />
        <NavItem view="calendar" label="Calendar" />
      </nav>

      {/* Sidebar Footer: Logout */}
      <div className="p-4 bg-black/10">
        <button 
          onClick={handleLogout}
          className="
            w-full py-3 rounded-xl border border-red-400/30 text-red-200 text-sm font-bold
            hover:bg-red-500/20 transition-all active:scale-95 flex items-center justify-center gap-2
          "
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Navbar;