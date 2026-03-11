import React, { useState } from 'react';
import ProgramCard from './Programcard';
import ProgramDetails from './Programdetails';
import '../../css/program.css';

const ProgramList = () => {
  // 1. States for Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  
  // 2. States for Modals
  const [selectedProgram, setSelectedProgram] = useState(null); // For Details Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // For Add/Edit Form

  const [programs] = useState([
    { id: 1, code: 'BSCS', name: 'BS in Computer Science', type: "Bachelor's", duration: '4 Years', units: 160, status: 'Active' },
    { id: 2, code: 'BSIT', name: 'BS in Information Technology', type: "Bachelor's", duration: '4 Years', units: 162, status: 'Active' },
    { id: 3, code: 'ACT', name: 'Associate in Computer Technology', type: 'Diploma', duration: '2 Years', units: 72, status: 'Under Review' },
    { id: 4, code: 'BSEMC', name: 'BS in Entertainment & Multimedia', type: "Bachelor's", duration: '4 Years', units: 165, status: 'Phased Out' },
  ]);

  // 3. Filtering Logic
  const filteredPrograms = programs.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesType = typeFilter === 'All' || p.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="program-list-container">
      {/* --- TOP CONTROL BAR --- */}
      <div className="program-controls">
        <div className="search-wrapper">
          <input 
            type="text" 
            placeholder="Search by code or program name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-wrapper">
          <select onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Under Review">Under Review</option>
            <option value="Phased Out">Phased Out</option>
          </select>

          <select onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Diploma">Diploma</option>
          </select>

          <button className="add-new-btn" onClick={() => setIsAddModalOpen(true)}>
            + Add Program
          </button>
        </div>
      </div>

      {/* --- GRID VIEW --- */}
      <div className="program-grid">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onView={() => setSelectedProgram(program)}
              onEdit={() => setIsAddModalOpen(true)} // Opens the same form modal
            />
          ))
        ) : (
          <p className="no-results">No programs match your criteria.</p>
        )}
      </div>

      {/* --- MODAL: PROGRAM DETAILS --- */}
      {selectedProgram && (
        <div className="modal-overlay" onClick={() => setSelectedProgram(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProgram(null)}>&times;</button>
            <ProgramDetails program={selectedProgram} isModalView={true} />
          </div>
        </div>
      )}

      {/* --- MODAL: ADD/EDIT FORM (DESIGN ONLY) --- */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Program Management</h2>
              <p>Fill in the details to create or update a university program.</p>
            </div>
            
            <form className="program-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="input-group">
                  <label>Program Code</label>
                  <input type="text" placeholder="e.g., BSCS" />
                </div>
                <div className="input-group">
                  <label>Program Type</label>
                  <select>
                    <option>Bachelor's</option>
                    <option>Diploma</option>
                    <option>Certificate</option>
                  </select>
                </div>
              </div>

              <label>Full Program Name</label>
              <input type="text" placeholder="e.g., Bachelor of Science in Computer Science" />

              <label>Description</label>
              <textarea rows="3" placeholder="Briefly describe the program objectives..."></textarea>

              <div className="form-grid">
                <div className="input-group">
                  <label>Duration</label>
                  <input type="text" placeholder="e.g., 4 Years" />
                </div>
                <div className="input-group">
                  <label>Initial Status</label>
                  <select>
                    <option>Active</option>
                    <option>Under Review</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Save Program</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramList;