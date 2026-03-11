import React from 'react';
import '../../css/program.css';

const ProgramDetails = ({ program, isModalView }) => {
  // Guard clause: If no program is selected yet, don't render anything
  if (!program) return null;

  // Use the passed program data, fallback to defaults if properties are missing
  const {
    code = 'N/A',
    name = 'Unknown Program',
    description = 'No description available.',
    duration = 'N/A',
    units = 0,
    curriculum = [] // In a real app, you'd fetch this based on program.id
  } = program;

  return (
    <div className={`details-container ${isModalView ? 'in-modal' : ''}`}>
      
      {/* Hero Section */}
      <header className="program-hero">
        <div className="hero-main">
          <span className="hero-code">{code}</span>
          <h1>{name}</h1>
          <p className="program-desc">{description}</p>
        </div>
        <div className="hero-stats">
          <div className="stat-box">
            <span className="label">Duration</span>
            <span className="value">{duration}</span>
          </div>
          <div className="stat-box">
            <span className="label">Total Units</span>
            <span className="value">{units}</span>
          </div>
        </div>
      </header>

      {/* Year Levels & Subjects */}
      <section className="curriculum-section">
        <h3>Curriculum Overview</h3>
        {curriculum.length > 0 ? (
          <div className="year-grid">
            {curriculum.map((level, index) => (
              <div key={index} className="year-card">
                <h4>{level.year}</h4>
                {level.semesters.map((s, i) => (
                  <div key={i} className="semester-block">
                    <h5>{s.sem}</h5>
                    <ul>
                      {s.subjects.map((sub, j) => (
                        <li key={j}>{sub}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data-msg">
            <p>Detailed curriculum data is currently being updated for this program.</p>
          </div>
        )}
      </section>

      {/* Action Footer for Modal View */}
      {isModalView && (
        <div className="details-footer">
           <button className="print-btn" onClick={() => window.print()}>
             🖨️ Print Curriculum
           </button>
        </div>
      )}
    </div>
  );
};

export default ProgramDetails;