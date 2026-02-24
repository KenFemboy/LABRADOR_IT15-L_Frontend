import React, { useState } from 'react';
import '../../css/program.css';

const ProgramDetails = ({ programId, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data for a specific program
  const programData = {
    code: 'BSCS',
    name: 'Bachelor of Science in Computer Science',
    description: 'A rigorous program focusing on the theoretical foundations of information and computation, taking a scientific and practical approach to computation and its applications.',
    duration: '4 Years',
    units: 160,
    status: 'Active',
    curriculum: [
      {
        year: '1st Year',
        semesters: [
          { sem: '1st Semester', subjects: ['Intro to Computing', 'Programming 1', 'Math in Modern World'] },
          { sem: '2nd Semester', subjects: ['Programming 2', 'Discrete Math', 'Digital Design'] }
        ]
      },
      {
        year: '2nd Year',
        semesters: [
          { sem: '1st Semester', subjects: ['Data Structures', 'Object Oriented Programming', 'Ethics'] },
          { sem: '2nd Semester', subjects: ['Algorithms', 'Database Management', 'Computer Org'] }
        ]
      }
      // Add 3rd and 4th years as needed
    ]
  };

  return (
    <div className="details-container">
      {/* Back Button & Actions */}
      <div className="details-nav">
        <button className="back-btn" onClick={onBack}>← Back to Programs</button>
        <button className="edit-btn" onClick={() => setIsModalOpen(true)}>Edit Program</button>
      </div>

      {/* Hero Section */}
      <header className="program-hero">
        <div className="hero-main">
          <span className="hero-code">{programData.code}</span>
          <h1>{programData.name}</h1>
          <p className="program-desc">{programData.description}</p>
        </div>
        <div className="hero-stats">
          <div className="stat-box">
            <span className="label">Duration</span>
            <span className="value">{programData.duration}</span>
          </div>
          <div className="stat-box">
            <span className="label">Total Units</span>
            <span className="value">{programData.units}</span>
          </div>
        </div>
      </header>

      {/* Year Levels & Subjects */}
      <section className="curriculum-section">
        <h3>Curriculum Overview</h3>
        <div className="year-grid">
          {programData.curriculum.map((level, index) => (
            <div key={index} className="year-card">
              <h4>{level.year}</h4>
              {level.semesters.map((s, i) => (
                <div key={i} className="semester-block">
                  <h5>{s.sem}</h5>
                  <ul>
                    {s.subjects.map((sub, j) => <li key={j}>{sub}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Modal Design (Design Only) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Modify Program</h2>
              <button className="close-x" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form className="modal-form" onClick={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="input-group">
                  <label>Program Code</label>
                  <input type="text" defaultValue={programData.code} />
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <select>
                    <option>Active</option>
                    <option>Under Review</option>
                    <option>Phased Out</option>
                  </select>
                </div>
              </div>
              <label>Full Program Name</label>
              <input type="text" defaultValue={programData.name} />
              
              <label>Description</label>
              <textarea rows="4" defaultValue={programData.description}></textarea>
              
              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="save-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramDetails;