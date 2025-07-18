import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openEmployeeMenu, setOpenEmployeeMenu] = useState(false);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  const menuItemClass =
    "flex items-center gap-3 cursor-pointer hover:bg-slate-700 p-3 rounded-xl transition-all duration-200";
  const submenuItemClass =
    "cursor-pointer hover:text-blue-400 transition ml-8 py-1 text-sm";

  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen p-6 shadow-2xl">
      {/* Logo / Header */}
      <div className="flex items-center justify-between text-white text-xl font-bold mb-8">
        <span className="tracking-wide">Face Attendance</span>
        <span className="bg-blue-500 text-xs font-semibold px-2 py-0.5 rounded-full">
          PRO
        </span>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-3">
          {/* Dashboard */}
          <li
            onClick={() => navigate("/")}
            className={menuItemClass}
          >
            <i className="fa-solid fa-chart-simple w-5 text-blue-400"></i>
            <span>Tổng Quan</span>
          </li>

          {/* Bảng công */}
          <li
            onClick={() => navigate("/attendance")}
            className={menuItemClass}
          >
            <i className="fa-solid fa-clock w-5 text-green-400"></i>
            <span>Bảng Công</span>
          </li>

          {/* Bảng lương */}
          <li
            onClick={() => navigate("/salary")}
            className={menuItemClass}
          >
            <i className="fa-solid fa-file w-5 text-yellow-400"></i>
            <span>Bảng Lương</span>
          </li>

          {/* Quản lý nhân viên */}
          <li>
            <div
              onClick={() => setOpenEmployeeMenu(!openEmployeeMenu)}
              className={menuItemClass}
            >
              <i className="fa-solid fa-users w-5 text-pink-400"></i>
              <span>Quản Lý Nhân Viên</span>
              <i
                className={`fa-solid ml-auto transition-transform duration-300 ${
                  openEmployeeMenu ? "fa-chevron-down" : "fa-chevron-right"
                }`}
              ></i>
            </div>
            {openEmployeeMenu && (
              <ul className="mt-2 space-y-1">
                <li
                  onClick={() => navigate("/users")}
                  className={submenuItemClass}
                >
                  <span className="font-semibold">Thêm nhân viên</span>
                </li>
                <li
                  onClick={() => navigate("/employees")}
                  className={submenuItemClass}
                >
                  Danh sách nhân viên
                </li>
              </ul>
            )}
          </li>

          {/* Quản lý tài khoản */}
          <li>
            <div
              onClick={() => setOpenAccountMenu(!openAccountMenu)}
              className={menuItemClass}
            >
              <i className="fa-solid fa-user w-5 text-orange-400"></i>
              <span>Quản Lý Tài Khoản</span>
              <i
                className={`fa-solid ml-auto transition-transform duration-300 ${
                  openAccountMenu ? "fa-chevron-down" : "fa-chevron-right"
                }`}
              ></i>
            </div>
            {openAccountMenu && (
              <ul className="mt-2 space-y-1">
                <li
                  onClick={() => navigate("/account/add")}
                  className={submenuItemClass}
                >
                  Thêm tài khoản
                </li>
                <li
                  onClick={() => navigate("/account/change-password")}
                  className={submenuItemClass}
                >
                  Đổi mật khẩu
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
