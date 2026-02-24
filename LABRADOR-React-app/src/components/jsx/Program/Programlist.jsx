import React, { useState } from 'react';
import ProgramCard from '../Program/Programcard.jsx';
import ProgramDetails from '../Program/Programdetails.jsx'; // Import your details component
import '../../css/program.css'; // Import your CSS for styling

const ProgramList = () => {
  const [programs] = useState([
    /* ... your program data ... */
    { id: 1, code: 'BSCS', name: 'BS in Computer Science', type: "Bachelor's", duration: '4 Years', units: 160, status: 'Active' },
  ]);

  // State to track the program selected for the modal
  const [selectedProgram, setSelectedProgram] = useState(null);

  const openDetails = (program) => {
    setSelectedProgram(program);
  };

  const closeDetails = () => {
    setSelectedProgram(null);
  };

  return (
    <div className="program-list-page">
      {/* ... Header and Filters ... */}

      <div className="table-wrapper">
        <div className="program-grid">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onView={() => openDetails(program)} // Now opens modal
              onEdit={(p) => console.log("Editing", p.code)}
            />
          ))}
        </div>
      </div>

      {/* --- PROGRAM DETAILS MODAL --- */}
      {selectedProgram && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeDetails}>&times;</button>
            
            {/* Pass the selected program data to your existing component */}
            <ProgramDetails 
              program={selectedProgram} 
              isModalView={true} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramList;