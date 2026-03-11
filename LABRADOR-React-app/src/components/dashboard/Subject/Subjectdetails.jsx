import React from 'react';
import '../../css/subject.css';

const SubjectDetails = ({ subjectId, onBack }) => {
  // Mock Data - In a real app, you'd fetch this using the subjectId
  const subjectData = {
    code: 'CS221',
    title: 'Data Structures and Algorithms',
    units: 4,
    term: '1st Semester',
    description: 'A deep dive into the organization of data for efficient storage and retrieval, alongside the design and analysis of algorithms to solve complex computational problems.',
    program: 'BS in Computer Science',
    preRequisites: ['CS101', 'MATH11'], // Mock array of codes
    coRequisites: [] // Empty to demonstrate the 'none' display
  };

  return (
    <div className="subject-details-container">
      {/* Navigation Header */}
      <div className="details-header-nav">
        <button className="back-link" onClick={onBack}>← Back to Subject Catalog</button>
        <div className="header-actions">
          <button className="btn-secondary">Download Syllabus</button>
          <button className="btn-primary">Edit Subject</button>
        </div>
      </div>

      <div className="details-main-grid">
        {/* Left Column: Primary Info */}
        <section className="info-section main-info">
          <div className="badge-row">
            <span className="code-badge">{subjectData.code}</span>
            <span className="program-label">{subjectData.program}</span>
          </div>
          <h1>{subjectData.title}</h1>
          <p className="description-text">{subjectData.description}</p>
          
          <div className="meta-info-grid">
            <div className="meta-item">
              <span className="meta-label">Credit Units</span>
              <span className="meta-value">{subjectData.units} Units</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Term Offered</span>
              <span className="meta-value">{subjectData.term}</span>
            </div>
          </div>
        </section>

        {/* Right Column: Dependencies */}
        <aside className="dependency-section">
          <div className="dep-card">
            <h3>Pre-requisites</h3>
            <div className="dep-list">
              {subjectData.preRequisites.length > 0 ? (
                subjectData.preRequisites.map((req, idx) => (
                  <div key={idx} className="dep-item req-pill">{req}</div>
                ))
              ) : (
                <span className="none-text">None</span>
              )}
            </div>
          </div>

          <div className="dep-card">
            <h3>Co-requisites</h3>
            <div className="dep-list">
              {subjectData.coRequisites.length > 0 ? (
                subjectData.coRequisites.map((req, idx) => (
                  <div key={idx} className="dep-item co-pill">{req}</div>
                ))
              ) : (
                <span className="none-text">None</span>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SubjectDetails;