import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const EnrollmentChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/departments`);
      const json = await res.json();

      const departments = json.data;

      const chartData = departments.map((dept) => ({
        name: dept.department_name,
        value: dept.courses.reduce(
          (total, course) => total + course.enrolled_students,
          0
        ),
      }));

      setData(chartData);
    };

    fetchDepartments();
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Student Enrollment by Department</h2>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={140}
            fill="#63f163"
            label={({ name, value }) => `${name}: ${value}`}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnrollmentChart;