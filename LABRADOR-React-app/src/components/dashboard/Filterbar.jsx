import React from "react";

const FilterBar = ({ filters, setFilters, departmentOptions }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      department: "",
      yearLevel: "",
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-[var(--anemo-glow)] mb-10 transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        
        {/* Search Student Section */}
        <div className="md:col-span-5 space-y-2">
          <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[var(--secondary-green)] ml-1">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]"></span>
            Search Registry
          </label>
          <div className="relative group">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Enter name or Student ID..."
              className="w-full bg-[var(--bg-cream)]/50 p-4 pl-12 rounded-2xl border-2 border-transparent focus:border-[var(--primary-teal)] focus:bg-white outline-none transition-all shadow-inner text-[var(--lyre-brown)] font-medium placeholder:text-gray-400"
            />
            
          </div>
        </div>

        {/* Department Select */}
        <div className="md:col-span-3 space-y-2">
          <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--secondary-green)] ml-1">
            Sector
          </label>
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="w-full bg-[var(--bg-cream)]/50 p-4 rounded-2xl border-2 border-transparent focus:border-[var(--primary-teal)] focus:bg-white outline-none transition-all cursor-pointer font-bold text-[var(--lyre-brown)] appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%233d8a83%27 stroke-width=%273%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
          >
            <option value="">All Departments</option>
            {departmentOptions && departmentOptions.map((dept) => (
              <option key={dept.id} value={dept.department_name}>
                {dept.department_name}
              </option>
            ))}
          </select>
        </div>

        {/* Year Level Select */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--secondary-green)] ml-1">
            Level
          </label>
          <select
            name="yearLevel"
            value={filters.yearLevel}
            onChange={handleChange}
            className="w-full bg-[var(--bg-cream)]/50 p-4 rounded-2xl border-2 border-transparent focus:border-[var(--primary-teal)] focus:bg-white outline-none transition-all cursor-pointer font-bold text-[var(--lyre-brown)] appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%233d8a83%27 stroke-width=%273%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
          >
            <option value="">All Years</option>
            <option value="1">L-01</option>
            <option value="2">L-02</option>
            <option value="3">L-03</option>
            <option value="4">L-04</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="md:col-span-2">
          <button
            onClick={clearFilters}
            className="w-full bg-[var(--primary-teal)] hover:bg-[var(--secondary-green)] text-white font-black uppercase tracking-widest text-xs py-[18px] rounded-2xl shadow-lg shadow-[var(--primary-teal)]/20 active:scale-95 transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;