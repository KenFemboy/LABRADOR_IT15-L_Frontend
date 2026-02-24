import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../css/Dashboard.css';

const Dashboard = () => {
  // Mock Data - In a real app, these would come from your API
  const stats = [
    { label: "Total Programs", value: 12, icon: "📚", color: "var(--primary-teal)" },
    { label: "Total Subjects", value: 148, icon: "📖", color: "var(--secondary-green)" },
    { label: "With Pre-requisites", value: 42, icon: "🔗", color: "var(--lyre-brown)" },
    { label: "Active Programs", value: 10, icon: "✅", color: "#28a745" },
  ];

  const subjectsPerTerm = [
    { name: '1st Sem', count: 45 },
    { name: '2nd Sem', count: 38 },
    { name: 'Summer', count: 12 },
  ];

  const programStatus = [
    { name: 'Active', value: 10 },
    { name: 'Inactive', value: 2 },
  ];

  const COLORS = ['#36997d', '#d4af37']; // Teal and Gold

  return (
    <div className="dashboard-container">
      {/* 1. Summary Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTop: `4px solid ${stat.color}` }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        {/* 2. Bar Chart: Subjects per Semester */}
        <div className="chart-card">
          <h3>Subjects per Semester</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectsPerTerm}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{fill: '#f4f7f6'}} />
              <Bar dataKey="count" fill="var(--primary-teal)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Pie Chart: Active vs Inactive */}
        <div className="chart-card">
          <h3>Program Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={programStatus}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {programStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            <span style={{color: '#36997d'}}>● Active</span>
            <span style={{color: '#d4af37'}}>● Inactive</span>
          </div>
        </div>
      </div>

      {/* 4. Recent Activity Table */}
      <div className="recent-activity">
        <h3>Recently Added</h3>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Date Added</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BS in Computer Science</td>
              <td>Program</td>
              <td>Oct 24, 2025</td>
              <td><span className="badge active">Active</span></td>
            </tr>
            <tr>
              <td>Advanced Algorithms</td>
              <td>Subject</td>
              <td>Oct 20, 2025</td>
              <td><span className="badge active">Active</span></td>
            </tr>
            <tr>
              <td>Data Structures</td>
              <td>Subject</td>
              <td>Oct 18, 2025</td>
              <td><span className="badge inactive">Inactive</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;