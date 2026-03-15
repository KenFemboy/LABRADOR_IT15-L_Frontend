import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";

const StudentProfile = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/students/${user.id}/courses`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        if (data.status === "success") {
          setProfile(data.student);
        } else {
          setError(data.message || "Failed to fetch profile.");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-cream)]">
      <p className="text-[var(--lyre-brown)] font-medium bg-[var(--anemo-glow)] px-6 py-3 rounded-full shadow-sm border border-[var(--primary-teal)]">
        Please log in to view your dashboard.
      </p>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-cream)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[var(--anemo-glow)] border-t-[var(--primary-teal)] rounded-full animate-spin"></div>
        <p className="animate-pulse text-[var(--primary-teal)] font-bold tracking-widest uppercase text-sm">Loading Anemo Files...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg-cream)]">
      <div className="max-w-md w-full p-6 border-l-4 border-red-500 bg-white shadow-lg rounded-r-xl">
        <h3 className="text-red-700 font-bold mb-1">System Error</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col md:flex-row">
      
      {/* SIDEBAR: Personal Information */}
      <aside className="w-full md:w-80 bg-white shadow-2xl z-10 flex flex-col border-r border-[var(--border-color)]">
        {/* Profile Header Decoration */}
        <div className="h-24 bg-[var(--secondary-green)] relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-white p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-[var(--anemo-glow)] flex items-center justify-center border-2 border-[var(--primary-teal)]">
              <span className="text-3xl font-black text-[var(--secondary-green)]">{profile.name.charAt(0)}</span>
            </div>
          </div>
        </div>

        <div className="pt-16 px-6 pb-8 flex-grow">

          <div className="space-y-6">
            <div className="bg-[var(--bg-cream)] p-4 rounded-xl border border-[var(--anemo-glow)]">
              <label className="block text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.2em] mb-1">Student ID</label>
              <p className="text-[var(--lyre-brown)] font-mono font-bold">{profile.student_number}</p>
            </div>

            <div className="p-2">
              <label className="block text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.2em] mb-3">Contact Details</label>
              <div className="space-y-3">
                 <div className="flex items-center text-sm text-[var(--text-main)]">
                    <span className="w-6 text-[var(--accent-gold)]">✉</span>
                    {profile.email}
                 </div>
                 <div className="flex items-center text-sm text-[var(--text-main)]">
                    <span className="w-6 text-[var(--accent-gold)]">📍</span>
                    Main Campus
                 </div>
              </div>
            </div>

            {profile.courses.length > 0 && (
              <div className="p-2">
                <label className="block text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.2em] mb-2">Department</label>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(profile.courses.map(c => c.department?.department_name).filter(Boolean))).map((dept, i) => (
                    <span onClick={() => onNavigate('courses')} key={i} className="text-[18px] bg-[var(--primary-teal)] text-white font-bold px-8 py-1 rounded" >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

       
      </aside>

      {/* MAIN CONTENT: Courses & Analytics */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        <header className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-[var(--lyre-brown)] tracking-tight">Academic Overview</h1>
            <p className="text-[var(--text-muted)] mt-1">Manage your active enrollments and course progress.</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right border-r-2 border-[var(--accent-gold)] pr-4">
              <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Year Level</p>
              <p className="text-xl font-black text-[var(--primary-teal)]">{profile.year_level || "N/A"}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Total Courses</p>
              <p className="text-xl font-black text-[var(--primary-teal)]">{profile.courses.length}</p>
            </div>
          </div>
        </header>

        <section className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {profile.courses.length > 0 ? (
              profile.courses.map((course) => (
                <div key={course.id} className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border-b-4 border-transparent hover:border-[var(--accent-gold)]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg bg-[var(--anemo-glow)] text-[var(--secondary-green)] group-hover:bg-[var(--primary-teal)] group-hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Ref M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.74 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <span className="text-[10px] font-bold text-[var(--accent-gold)] uppercase tracking-widest px-2 py-1 rounded bg-amber-50">Enrolled</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--lyre-brown)] mb-1 group-hover:text-[var(--primary-teal)] transition-colors">
                    {course.course_name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    {course.department?.department_name || "General Department"}
                  </p>
                  <div onClick={() => onNavigate('courses')} className="flex items-center gap-2 text-[var(--primary-teal)] text-xs font-bold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW SYLLABUS <span>↗</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-[var(--border-color)]">
                <p className="text-[var(--text-muted)] font-medium italic">No courses found for the current semester.</p>
              </div>
            )}
          </div>
        </section>
      </main>

    </div>
  );
};

export default StudentProfile;