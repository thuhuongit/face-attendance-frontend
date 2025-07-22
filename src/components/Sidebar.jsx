import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openEmployeeMenu, setOpenEmployeeMenu] = useState(false);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  const menuItemClass =
    "flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-slate-700 transition";
  const submenuItemClass =
    "ml-6 text-sm text-slate-300 hover:text-white cursor-pointer py-1 transition";

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white shadow-xl flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 text-2xl font-bold tracking-wide border-b border-slate-700">
        Face Attendance
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          <li
            onClick={() => navigate("/")}
            className="cursor-pointer hover:bg-slate-800 px-4 py-3 rounded-lg flex items-center gap-3"
          >
            <i className="fa-solid fa-chart-simple text-blue-400 w-5"></i>
            <span className="font-medium">Tổng Quan</span>
          </li>

          <li
            onClick={() => navigate("/attendance")}
            className="cursor-pointer hover:bg-slate-800 px-4 py-3 rounded-lg flex items-center gap-3"
          >
            <i className="fa-solid fa-clock text-green-400 w-5"></i>
            <span className="font-medium">Bảng Công</span>
          </li>

          <li
            onClick={() => navigate("/salary")}
            className="cursor-pointer hover:bg-slate-800 px-4 py-3 rounded-lg flex items-center gap-3"
          >
            <i className="fa-solid fa-file text-yellow-400 w-5"></i>
            <span className="font-medium">Bảng Lương</span>
          </li>

          {/* Nhân viên */}
          <li>
            <div
              onClick={() => setOpenEmployeeMenu(!openEmployeeMenu)}
              className={menuItemClass}
            >
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-users text-pink-400 w-5"></i>
                <span className="font-medium">Nhân Viên</span>
              </div>
              <i
                className={`fa-solid transition-transform duration-300 ${
                  openEmployeeMenu ? "fa-chevron-down" : "fa-chevron-right"
                }`}
              ></i>
            </div>
            {openEmployeeMenu && (
              <ul className="mt-1 space-y-1">
                <li onClick={() => navigate("/users")} className={submenuItemClass}>
                  Thêm nhân viên
                </li>
                <li onClick={() => navigate("/employees")} className={submenuItemClass}>
                  Danh sách nhân viên
                </li>
              </ul>
            )}
          </li>

          {/* Tài khoản */}
          <li>
            <div
              onClick={() => setOpenAccountMenu(!openAccountMenu)}
              className={menuItemClass}
            >
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-user text-orange-400 w-5"></i>
                <span className="font-medium">Tài Khoản</span>
              </div>
              <i
                className={`fa-solid transition-transform duration-300 ${
                  openAccountMenu ? "fa-chevron-down" : "fa-chevron-right"
                }`}
              ></i>
            </div>
            {openAccountMenu && (
              <ul className="mt-1 space-y-1">
                <li
                  onClick={() => navigate("/account/add")}
                  className={submenuItemClass}
                >
                  Danh sách tài khoản
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
