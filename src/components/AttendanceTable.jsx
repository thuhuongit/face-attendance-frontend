import React, { useEffect, useState } from "react";
import { fetchAttendance } from "../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const AttendanceTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAttendance()
      .then(res => setData(res.data))
      .catch(err => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  // Lọc theo tên người dùng
  const filteredData = data.filter(item =>
    item.user_name.toLowerCase().includes(search.toLowerCase())
  );
  const exportToExcel = () => {
  const worksheetData = filteredData.map(item => ({
    Tên: item.user_name,
    "Check-In": new Date(item.check_in_time).toLocaleString(),
    "Check-Out": item.check_out_time
      ? new Date(item.check_out_time).toLocaleString()
      : "Chưa checkout"
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng công");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(fileData, "bang_cong.xlsx");
};


  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-4">Bảng công</h1>
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
            <th className="border px-4 py-2">Check-In</th>
            <th className="border px-4 py-2">Check-Out</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{item.user_name}</td>
              <td className="border px-4 py-2">
                {new Date(item.check_in_time).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                {item.check_out_time
                  ? new Date(item.check_out_time).toLocaleString()
                  : "Chưa checkout"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
             onClick={exportToExcel}
             className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
         Xuất Excel
      </button>
    </div>
  );
};

export default AttendanceTable;
