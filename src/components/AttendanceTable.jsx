import React, { useEffect, useState } from "react";
import { fetchAttendance } from "../api/api";

const AttendanceTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAttendance()
      .then(res => setData(res.data))
      .catch(err => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-4">Bảng công</h1>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-300">
            <th className="border px-4 py-2">Tên</th>
            <th className="border px-4 py-2">Check-In</th>
            <th className="border px-4 py-2">Check-Out</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
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
    </div>
  );
};

export default AttendanceTable;

