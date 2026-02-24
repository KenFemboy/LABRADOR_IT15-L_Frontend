import React, { useState } from 'react';
import '../css/Overview.css'; 
import Dashboard from '../../components/jsx/Dashboard.jsx';
import Program from '../../components/jsx/Program/Program.jsx';
import Subject from '../../components/jsx/Subject/Subject.jsx';



const Overview = () => {
  // State to track which view is active. Defaults to 'dashboard'
  const [activeView, setActiveView] = useState('dashboard');

  // Function to determine which component to show
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'program':
        return <Program />;
      case 'subject':
        return <Subject />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="overview-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo">🎓</span>
          <h2>UniPortal</h2>
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
          {/* Example of a logout action; for now it just resets or alerts */}
          <button className="logout-btn" onClick={() => alert('Logging out...')}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="content-header">
          <h1>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h1>
          <div className="user-profile">
            <span className="user-name">Student Name</span>
            <div className="user-avatar">S</div>
          </div>
        </header>

        {/* This is where the magic happens: the component renders here */}
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Overview;