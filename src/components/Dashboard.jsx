import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import { fetchUsers, fetchSalary, fetchAttendance } from "../api/api";

const COLORS = ["#4ade80", "#f87171"]; // Xanh: điểm danh, Đỏ: vắng

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHours: 0,
    totalSalary: 0,
    todayAttendance: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUsers();
      const salary = await fetchSalary();
      const attendance = await fetchAttendance();

      const totalHours = Object.values(salary.data).reduce(
        (sum, u) => sum + Number(u.total_hours), 0
      );
      const totalSalary = Object.values(salary.data).reduce(
        (sum, u) => sum + Number(u.total_salary), 0
      );

      const today = new Date().toISOString().slice(0, 10);
      const todayAttendance = attendance.data.filter(
        (log) => log.date === today
      ).length;

      const transformedChart = Object.entries(salary.data).map(
        ([name, info]) => ({
          name,
          hours: Number(info.total_hours),
          salary: Number(info.total_salary),
        })
      );

      const pie = [
        { name: "Có mặt", value: todayAttendance },
        { name: "Vắng", value: users.data.length - todayAttendance },
      ];

      setStats({
        totalUsers: users.data.length,
        totalHours,
        totalSalary,
        todayAttendance,
      });

      setChartData(transformedChart);
      setPieData(pie);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center">Thống Kê Doanh Số</h1>

      {/* Cards thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Nhân viên" value={stats.totalUsers} color="bg-blue-100" />
        <StatCard label="Giờ làm (tổng)" value={stats.totalHours.toFixed(1)} color="bg-green-100" />
        <StatCard label="Tổng lương (VNĐ)" value={stats.totalSalary.toLocaleString()} color="bg-yellow-100" />
        <StatCard label="Điểm danh hôm nay" value={stats.todayAttendance} color="bg-pink-100" />
      </div>

      {/* Biểu đồ tổng hợp */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar + Line */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Giờ làm & Lương theo nhân viên</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="hours" fill="#60a5fa" name="Giờ làm" />
              <Line yAxisId="right" type="monotone" dataKey="salary" stroke="#f97316" name="Lương" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-center">Tỉ lệ điểm danh hôm nay</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className={`rounded-xl p-4 shadow-sm ${color}`}>
    <p className="text-gray-700 text-sm">{label}</p>
    <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
  </div>
);

export default Dashboard;
