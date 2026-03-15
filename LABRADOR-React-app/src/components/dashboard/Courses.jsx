import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/departments`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        if (data.status === "success") {
          const department = data.data.find(
            (dept) => dept.id === user.department_id
          );
          setCourses(department ? department.courses : []);
        } else {
          throw new Error(data.message || "Failed to fetch courses");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (!user) return <div>Please log in to view your courses.</div>;
  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 bg-[#f4f7f6] min-h-screen">
      <h2 className="text-xl font-bold mb-4">Courses in Your Department</h2>
      <ul className="space-y-3">
        {courses.map((course) => {
          const enrolled = course.students.some(
            (student) => student.id === user.id
          );
          return (
            <li
              key={course.id}
              className={`p-4 rounded-lg border ${
                enrolled ? "bg-green-100 border-green-400" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{course.course_name}</span>
                <span className="text-sm text-gray-600">
                  {course.enrolled_students} students
                  {enrolled && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-green-500 rounded">
                      Enrolled
                    </span>
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Courses;