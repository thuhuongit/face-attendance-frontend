import React, { useEffect, useState } from "react";
import { fetchSalary } from "../api/api";

const SalaryTable = () => {
  const [salaries, setSalaries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSalary().then((res) => {
      const raw = res.data;
      // Chuyển object thành mảng để dễ xử lý
      const arr = Object.entries(raw).map(([name, value]) => ({
        user_name: name,
        ...value,
      }));
      setSalaries(arr);
    });
  }, []);

  // Lọc theo tên người dùng
  const filteredData = salaries.filter((item) =>
    item.user_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-4">Bảng lương</h1>

      {/* Ô tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 w-full"
        />
      </div>

      <table className="w-full border border-collapse">
        <thead className="bg-gray-300">
          <tr>
            <th className="border px-4 py-2">Tên</th>
            <th className="border px-4 py-2">Giờ làm</th>
            <th className="border px-4 py-2">Lương/h</th>
            <th className="border px-4 py-2">Tổng</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{item.user_name}</td>
              <td className="border px-4 py-2">{item.total_hours}</td>
              <td className="border px-4 py-2">{item.salary_per_hour}</td>
              <td className="border px-4 py-2">{item.total_salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryTable;
