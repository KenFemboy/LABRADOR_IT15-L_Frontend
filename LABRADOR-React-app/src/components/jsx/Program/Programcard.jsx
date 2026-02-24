import React from 'react';
import '../../css/program.css';

const ProgramCard = ({ program, onView, onEdit }) => {
  

  return (
    <div className="program-card">
      <div className="card-header">
        <span className="program-code-tag">{program.code}</span>
        <span className={`status-dot ${program.status.toLowerCase().replace(/\s/g, '-')}`}>
          {program.status}
        </span>
      </div>
      
      <div className="card-body">
        <h3 className="program-name">{program.name}</h3>
        <p className="program-type">{program.type}</p>
        
        <div className="program-meta">
          <div className="meta-item">
            <span className="meta-icon">⏳</span>
            <span>{program.duration}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">📘</span>
            <span>{program.units} Units</span>
          </div>
        </div>
      </div>

      <div className="card-actions">
        <button className="card-btn edit" onClick={() => onEdit(program)}>Edit</button>
        <button className="card-btn view" onClick={() => onView(program)}>View Details</button>
      </div>
    </div>
  );
};

export default ProgramCard;