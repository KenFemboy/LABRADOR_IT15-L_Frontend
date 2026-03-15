import React, { useEffect, useState } from "react";
import FilterBar from "./Filterbar.jsx"; // Make sure the path is correct
const Chevron = ({ isOpen, colorClass = "text-current" }) => (
  <svg 
    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${colorClass}`} 
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
  </svg>
);
// ... (Chevron and imports remain the same)

const AttendanceChart = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDept, setOpenDept] = useState(null);
  const [openCourse, setOpenCourse] = useState(null);

  // 1. UPDATED KEYS TO MATCH FILTERBAR
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    yearLevel: "",
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/departments");
        const data = await res.json();
        if (data.status === "success") setDepartments(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  // 2. UPDATED LOGIC TO USE THE NEW KEYS
  const filteredData = departments
    .filter((dept) => 
      !filters.department || dept.department_name === filters.department
    )
    .map((dept) => {
      const processedCourses = dept.courses.map((course) => {
        const matchingStudents = course.students.filter((student) => {
          const matchesSearch = 
            student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            student.student_number.toLowerCase().includes(filters.search.toLowerCase());
          
          const matchesYear = 
            !filters.yearLevel || String(student.year_level) === String(filters.yearLevel);

          return matchesSearch && matchesYear;
        });

        return { ...course, students: matchingStudents };
      });

      const activeFilter = filters.search || filters.yearLevel;
      const visibleCourses = activeFilter 
        ? processedCourses.filter(c => c.students.length > 0)
        : processedCourses;

      return { ...dept, courses: visibleCourses };
    })
    .filter(dept => dept.courses.length > 0);

  if (loading) return <div className="p-20 text-center animate-pulse">Syncing...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10 border-b-2 border-[var(--anemo-glow)] pb-6">
        <h2 className="text-4xl font-black text-[var(--lyre-brown)] tracking-tight">Registry of Winds</h2>
        <p className="text-[var(--text-muted)] mt-2 font-medium italic">Manage student enrollment records.</p>
      </header>

      {/* 3. FIXED PROP NAME: Changed departments to departmentOptions */}
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        departmentOptions={departments || []} 
      />

      <div className="space-y-6">
        {filteredData.map((dept) => {
          const isDeptOpen = openDept === dept.id;
          return (
            <div key={dept.id} className="rounded-2xl overflow-hidden shadow-sm border border-[var(--border-color)] bg-white transition-all">
              <button
                className={`w-full text-left p-6 flex justify-between items-center transition-all
                  ${isDeptOpen ? 'bg-[var(--secondary-green)]' : 'bg-white hover:bg-[var(--bg-cream)]'}`}
                onClick={() => setOpenDept(isDeptOpen ? null : dept.id)}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-1.5 h-10 rounded-full ${isDeptOpen ? 'bg-[var(--accent-gold)]' : 'bg-[var(--primary-teal)]'}`}></div>
                  <div>
                    <h3 className={`text-xl font-bold transition-colors ${isDeptOpen ? 'text-white' : 'text-[var(--lyre-brown)]'}`}>
                      {dept.department_name}
                    </h3>
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-0.5 ${isDeptOpen ? 'text-[var(--anemo-glow)] opacity-80' : 'text-[var(--text-muted)]'}`}>
                      {dept.courses.length} MATCHING COURSES
                    </p>
                  </div>
                </div>
                <Chevron isOpen={isDeptOpen} colorClass={isDeptOpen ? "text-[var(--accent-gold)]" : "text-[var(--primary-teal)]"} />
              </button>

              {isDeptOpen && (
                <div className="p-6 space-y-4 bg-[var(--bg-cream)]/40">
                  {dept.courses.map((course) => {
                    const isCourseOpen = openCourse === course.id;
                    return (
                      <div key={course.id} className={`bg-white rounded-xl border transition-all ${isCourseOpen ? 'border-[var(--primary-teal)] shadow-md ring-1' : 'border-gray-200'}`}>
                        <button
                          className="w-full text-left p-4 flex justify-between items-center group"
                          onClick={() => setOpenCourse(isCourseOpen ? null : course.id)}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-[9px] font-black px-2 py-1 rounded ${isCourseOpen ? 'bg-[var(--primary-teal)] text-white' : 'bg-[var(--anemo-glow)]'}`}>
                              {course.students.length} RESULTS
                            </span>
                            <span className={`text-lg font-bold ${isCourseOpen ? 'text-[var(--primary-teal)]' : 'text-[var(--lyre-brown)]'}`}>
                              {course.course_name}
                            </span>
                          </div>
                          <Chevron isOpen={isCourseOpen} />
                        </button>

                        {isCourseOpen && (
                          <div className="px-4 pb-5 overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                              <thead>
                                <tr className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">
                                  <th className="p-3 border-b border-gray-100">Student ID</th>
                                  <th className="p-3 border-b border-gray-100">Full Name</th>
                                  <th className="p-3 border-b border-gray-100">Email Address</th>
                                  <th className="p-3 border-b border-gray-100 text-center">Year</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-50">
                                {course.students.map((student) => (
                                  <tr key={student.id} className="hover:bg-[var(--anemo-glow)]/10 transition-colors">
                                    <td className="p-3 font-mono text-xs font-bold text-[var(--secondary-green)]">{student.student_number}</td>
                                    <td className="p-3 text-sm font-semibold">{student.name}</td>
                                    <td className="p-3 text-sm text-[var(--text-muted)]">{student.email}</td>
                                    <td className="p-3 text-center">
                                      <span className="text-[10px] font-black bg-white border px-2 py-1 rounded">L-0{student.year_level}</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceChart;