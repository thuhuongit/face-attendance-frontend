import React, { useEffect, useState } from "react";
import { fetchAttendance } from "../api/api";

const AttendanceTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAttendance().then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🕒 Bảng công</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.user_id}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AttendanceTable;