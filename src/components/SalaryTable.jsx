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
      <table className="w-full border">
        <thead>
          <tr>
            <th>Tên</th><th>Giờ làm</th><th>Lương/h</th><th>Tổng</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(salaries).map(name => (
            <tr key={name}>
              <td>{name}</td>
              <td>{salaries[name].total_hours}</td>
              <td>{salaries[name].salary_per_hour}</td>
              <td>{salaries[name].total_salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryTable;