import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen p-5 shadow-lg">
      <div className="flex items-center gap-2 text-white text-xl font-bold">
        <span>Face Attendance</span>
        <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
          PRO
        </span>
      </div>

      <nav className="mt-15">
        <ul className="space-y-6">
          <li
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-700 p-2 rounded transition-all"
          >
            <i className="fa-solid fa-chart-simple w-5 text-blue-400"></i>
            <span>Dashboard</span>
          </li>
          <li
            onClick={() => navigate("/attendance")}
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-700 p-2 rounded transition-all"
          >
            <i className="fa-solid fa-clock w-5 text-green-400"></i>
            <span>Bảng Công</span>
          </li>
          <li
            onClick={() => navigate("/salary")}
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-700 p-2 rounded transition-all"
          >
            <i className="fa-solid fa-file w-5 text-yellow-400"></i>
            <span>Bảng Lương</span>
          </li>
          <li>
            <div
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex items-center gap-3 cursor-pointer hover:bg-slate-700 p-2 rounded transition-all"
            >
              <i className="fa-solid fa-users w-5 text-pink-400"></i>
              <span>Quản Lý Nhân Viên</span>
              <i className={`fa-solid fa-chevron-${openUserMenu ? "down" : "right"} ml-auto`}></i>
            </div>
            {openUserMenu && (
              <ul className="ml-8 mt-2 space-y-2">
                <li
                  onClick={() => navigate("/users")}
                  className="cursor-pointer hover:underline"
                >
                  Thêm nhân viên
                </li>
                <li
                  onClick={() => navigate("/users/add")}
                  className="cursor-pointer hover:underline"
                >
                 Danh sách nhân viên
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex items-center gap-3 cursor-pointer hover:bg-slate-700 p-2 rounded transition-all"
            >
              <i class="fa-solid fa-user text-orange-600"></i>
              <span>Quản Lý Tài Khoản</span>
              <i className={`fa-solid fa-chevron-${openUserMenu ? "down" : "right"} ml-auto`}></i>
            </div>
            {openUserMenu && (
              <ul className="ml-8 mt-2 space-y-2">
                <li
                  onClick={() => navigate("/users")}
                  className="cursor-pointer hover:underline"
                >
                  Thêm tài khoản
                </li>
                <li
                  onClick={() => navigate("/users/add")}
                  className="cursor-pointer hover:underline"
                >
                 Đổi mật khẩu
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;