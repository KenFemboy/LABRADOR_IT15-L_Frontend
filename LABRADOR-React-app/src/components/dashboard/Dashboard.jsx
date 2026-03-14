import React from 'react';
import { useState } from 'react';
import './Dashboard.css';
import Navbar from '../common/Navbar';

const Dashboard = () => {
  // keep the active view state here so both header and content can access it
  const [activeView, setActiveView] = useState('dashboard');

  // decide what to render in the main area based on current view
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <div>Welcome to the dashboard overview.</div>;
      case 'program':
        return <div>Program information will appear here.</div>;
      case 'subject':
        return <div>Subject details will appear here.</div>;
      case 'adminpanel':
        return <div>Admin panel information will appear here.</div>;
      default:
        return <div>Welcome to the dashboard overview.</div>;
    }
  };

  return (
    <div className="overview-layout">
      {/* Sidebar Navigation */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Area */}
      <main className="main-content">
        <header className="content-header">
          <h1>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h1>
          <div className="header-right"> 
            <span className="logo">🎓</span>
            <h2>UniPortal</h2>
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

export default Dashboard;