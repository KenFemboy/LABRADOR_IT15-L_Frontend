import React, { useState } from 'react';
import '../../css/program.css';

const ProgramList = () => {
  // Mock Data for University Programs
  const [programs] = useState([
    { id: 1, code: 'BSCS', name: 'BS in Computer Science', type: "Bachelor's", duration: '4 Years', units: 160, status: 'Active' },
    { id: 2, code: 'BSIT', name: 'BS in Information Technology', type: "Bachelor's", duration: '4 Years', units: 162, status: 'Active' },
    { id: 3, code: 'ACT', name: 'Associate in Computer Technology', type: 'Diploma', duration: '2 Years', units: 72, status: 'Under Review' },
    { id: 4, code: 'BSIS', name: 'BS in Information Systems', type: "Bachelor's", duration: '4 Years', units: 158, status: 'Active' },
    { id: 5, code: 'BSEMC', name: 'BS in Entertainment & Multimedia Computing', type: "Bachelor's", duration: '4 Years', units: 165, status: 'Phased Out' },
  ]);

  return (
    <div className="program-list-container">
      <div className="list-header">
        <div className="header-text">
          <h2>Program Management</h2>
          <p>Review and manage all academic offerings within the university.</p>
        </div>
        <button className="add-program-btn">+ Add New Program</button>
      </div>

      {/* Filter/Search Bar */}
      <div className="table-controls">
        <input type="text" placeholder="Search by program code or name..." className="search-input" />
        <select className="filter-select">
          <option value="">All Types</option>
          <option value="bachelors">Bachelor's</option>
          <option value="diploma">Diploma</option>
        </select>
      </div>

      {/* Programs Table */}
      <div className="table-wrapper">
        <table className="program-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Program Name</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Total Units</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <tr key={program.id}>
                <td className="code-cell">{program.code}</td>
                <td className="name-cell">{program.name}</td>
                <td>{program.type}</td>
                <td>{program.duration}</td>
                <td>{program.units} Units</td>
                <td>
                  <span className={`status-pill ${program.status.toLowerCase().replace(/\s/g, '-')}`}>
                    {program.status}
                  </span>
                </td>
                <td>
                  <button className="action-link edit">Edit</button>
                  <button className="action-link view">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramList;