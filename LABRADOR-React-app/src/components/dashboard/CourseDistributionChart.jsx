import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const CourseDistributionChart = () => {
  const [chartData, setChartData] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/departments`);
      const json = await res.json();

      const departments = json.data;

      const allCourses = [];
      const data = departments.map((dept) => {
        const row = { department: dept.department_name };

        dept.courses.forEach((course) => {
          row[course.course_name] = course.enrolled_students;

          if (!allCourses.includes(course.course_name)) {
            allCourses.push(course.course_name);
          }
        });

        return row;
      });

      setCourses(allCourses);
      setChartData(data);
    };

    fetchDepartments();
  }, []);

  const colors = [
    "#6366f1",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#8b5cf6",
    "#14b8a6"
  ];

  return (
    <div style={{ width: "100%", height: 450 }}>
      <h2 style={{ marginBottom: "20px" }}>
        Course Distribution by Department
      </h2>

      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />

          {courses.map((course, index) => (
            <Bar
              key={course}
              dataKey={course}
              stackId="students"
              fill={colors[index % colors.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseDistributionChart;