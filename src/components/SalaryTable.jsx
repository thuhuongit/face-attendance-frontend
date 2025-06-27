import React, { useEffect, useState } from "react";
import { fetchSalary } from "../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

  // ✅ Hàm export Excel CHUẨN DỮ LIỆU LƯƠNG
  const exportToExcel = () => {
    const worksheetData = filteredData.map((item) => ({
      Tên: item.user_name,
      "Giờ làm": item.total_hours,
      "Lương/h": item.salary_per_hour,
      "Tổng lương": item.total_salary,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng lương");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "bang_luong.xlsx");
  };

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

      {/* Nút xuất Excel */}
        <button
          onClick={exportToExcel}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Xuất Excel
        </button>
      
    </div>
  );
};

export default SalaryTable;
