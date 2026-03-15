import React, { useEffect, useState } from "react";
import { 
  PieChart, 
  Pie, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  Legend 
} from "recharts";

const EnrollmentChart = () => {
  const [data, setData] = useState([]);

  // Mapping your palette for the chart slices
  const COLORS = [
    "var(--primary-teal)",
    "var(--secondary-green)",
    "var(--accent-gold)",
    "var(--lyre-brown)",
    "var(--anemo-glow)",
  ];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/departments`);
        const json = await res.json();
        
        const chartData = json.data.map((dept) => ({
          name: dept.department_name,
          value: dept.courses.reduce(
            (total, course) => total + (course.enrolled_students || 0),
            0
          ),
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div style={{ 
      width: "100%", 
      height: 500, 
      backgroundColor: "var(--bg-cream)", 
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      border: "1px solid var(--border-color)"
    }}>
      <h2 style={{ 
        color: "var(--lyre-brown)", 
        fontFamily: "serif", 
        marginBottom: "1.5rem",
        textAlign: "center",
        borderBottom: `2px solid var(--accent-gold)`,
        paddingBottom: "0.5rem"
      }}>
        Student Enrollment by Department
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60} // Turned into a Donut chart for a modern look
            paddingAngle={5}
            stroke="none"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--bg-cream)", 
              border: `1px solid var(--primary-teal)`,
              borderRadius: "8px" 
            }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnrollmentChart;