import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

// Navbar now receives the active view and setter from its parent.
const Navbar = ({ activeView, setActiveView }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const userName = user?.name || user?.email || 'User';
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span className="user-name">{userName}</span>
                <div className="user-avatar">{userInitial}</div>
            </div>
                
            <nav className="sidebar-nav">
                <button
                    className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveView('dashboard')}
                >
                    Dashboard
                </button>
                <button
                    className={`nav-item ${activeView === 'program' ? 'active' : ''}`}
                    onClick={() => setActiveView('program')}
                >
                    Program
                </button>
                <button
                    className={`nav-item ${activeView === 'subject' ? 'active' : ''}`}
                    onClick={() => setActiveView('subject')}
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
    )
}

export default Navbar