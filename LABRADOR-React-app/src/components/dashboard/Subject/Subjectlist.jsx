import React, { useState } from 'react';
import '../../css/subject.css';

const SubjectList = () => {
  const [subjects] = useState([
    { id: 1, code: 'IT101', title: 'Intro to Computing', units: 3, availability: 'Semester', program: 'BSIT', hasPrereq: false },
    { id: 2, code: 'CS221', title: 'Data Structures', units: 4, availability: 'Both', program: 'BSCS', hasPrereq: true },
    { id: 3, code: 'MATH11', title: 'Discrete Math', units: 3, availability: 'Term', program: 'BSCS', hasPrereq: false },
    // More mock data...
  ]);

  return (
    <div className="catalog-wrapper">
      {/* Search and Advanced Filters */}
      <aside className="filter-sidebar">
        <h3>Search & Filters</h3>
        
        <div className="filter-group">
          <label>Search</label>
          <input type="text" placeholder="Code or Title..." className="sidebar-input" />
        </div>

        <div className="filter-group">
          <label>Offer Type</label>
          <select className="sidebar-input">
            <option>All Offerings</option>
            <option>Per Semester</option>
            <option>Per Term</option>
            <option>Both</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Credit Units</label>
          <div className="unit-checkboxes">
            <label><input type="checkbox" /> 2 Units</label>
            <label><input type="checkbox" /> 3 Units</label>
            <label><input type="checkbox" /> 4+ Units</label>
          </div>
        </div>

        <div className="filter-group">
          <label>Pre-requisites</label>
          <select className="sidebar-input">
            <option>Show All</option>
            <option>With Pre-requisites</option>
            <option>Without Pre-requisites</option>
          </select>
        </div>

        <button className="reset-filter-btn">Clear All Filters</button>
      </aside>

      {/* Main Table Area */}
      <main className="catalog-main">
        <div className="table-header-row">
          <h2>Subject Catalog</h2>
          <button className="add-btn">+ New Subject</button>
        </div>

        <div className="table-container">
          <table className="catalog-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject Title</th>
                <th>Program</th>
                <th>Units</th>
                <th>Availability</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(sub => (
                <tr key={sub.id}>
                  <td className="bold-teal">{sub.code}</td>
                  <td>{sub.title}</td>
                  <td><span className="prog-label">{sub.program}</span></td>
                  <td><strong>{sub.units}</strong></td>
                  <td>
                    {/* Visual Indicators for C and D */}
                    <span className={`indicator-pill ${sub.availability.toLowerCase()}`}>
                      {sub.availability}
                    </span>
                  </td>
                  <td>
                    {sub.hasPrereq ? 
                      <span className="prereq-badge">🔗 Linked</span> : 
                      <span className="none-badge">Standalone</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SubjectList;