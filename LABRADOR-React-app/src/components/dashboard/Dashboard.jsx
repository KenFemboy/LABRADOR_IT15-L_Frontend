import React from 'react';
import { useState } from 'react';
import './Dashboard.css';
import Navbar from '../common/Navbar';
import CourseDistribution from './CourseDistributionChart';
import EnrollmentChart from './EnrollmentChart';
import StudentProfile from './StudentProfile';
import Courses from './Courses';
import AttendanceChart from './AttendanceChart';
import ForecastDisplay from '../weather/ForecastDisplay';
import WeatherWidget from '../weather/WeatherWidget';
import Calendar from './Calendar.jsx';


const Dashboard = () => {
  // keep the active view state here so both header and content can access it
  const [activeView, setActiveView] = useState('dashboard');

  // decide what to render in the main area based on current view
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <StudentProfile onNavigate={setActiveView} />;
      case 'admin':
        return <>
              <EnrollmentChart />
              <CourseDistribution />
              </>;
      case 'information':
        return <CourseDistribution />;
      case 'courses':
        return <Courses />;
      case 'students':
        return <AttendanceChart />;
      case 'weather':
        return <ForecastDisplay/>;
      case 'calendar':
        return <Calendar/>
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
          <WeatherWidget/>
          <div className="header-right"> 
            <span className="logo"><img src="anemo.svg" alt="" /></span>
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