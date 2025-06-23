import React from "react";

const Sidebar = ({ onNavigate }) => (
  <div className="w-60 bg-slate-800 text-white min-h-screen p-4">
    <div class="flex items-center gap-2 text-white text-xl font-bold">
        <span>Face Attendance</span>
        <span class="bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded">PRO</span>
    </div>
    <nav class="flex flex-col mt-10 px-4">
    <ul className="space-y-4">
      <li onClick={() => onNavigate("dashboard")} className="cursor-pointer"><i class="fa-solid fa-chart-simple"></i> Dashboard</li>
      <li onClick={() => onNavigate("attendance")} className="cursor-pointer"><i class="fa-solid fa-clock"></i> Bảng công</li>
      <li onClick={() => onNavigate("salary")} className="cursor-pointer"><i class="fa-solid fa-file"></i> Bảng lương</li>
      <li onClick={() => onNavigate("users")} className="cursor-pointer"> <i class="fa-solid fa-users"></i> Quản lý nhân viên</li>
    </ul>
    </nav>
  </div>
);

export default Sidebar;