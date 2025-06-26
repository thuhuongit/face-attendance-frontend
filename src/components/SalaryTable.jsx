import React, { useEffect, useState } from "react";
import { fetchSalary } from "../api/api";

const SalaryTable = () => {
  const [salaries, setSalaries] = useState({});

  useEffect(() => {
    fetchSalary().then(res => setSalaries(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-4">Bảng lương</h1>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-300">
            <th className="border px-4 py-2">Tên</th>
            <th className="border px-4 py-2">Giờ làm</th>
            <th className="border px-4 py-2">Lương/h</th>
            <th className="border px-4 py-2">Tổng</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(salaries).map(name => (
            <tr key={name}>
              <td className="border px-4 py-2">{name}</td>
              <td className="border px-4 py-2">{salaries[name].total_hours}</td>
              <td className="border px-4 py-2">{salaries[name].salary_per_hour}</td>
              <td className="border px-4 py-2" >{salaries[name].total_salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryTable;