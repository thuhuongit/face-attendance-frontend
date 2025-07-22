import React, { useContext, useState } from "react";
import { FaExpand, FaBell, FaHome } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-end items-center bg-white px-4 py-2 shadow relative">
      <div className="flex items-center gap-4 relative">
        {/* Nút trang chủ */}
        <div
          className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-blue-500 px-2 py-1 rounded hover:bg-gray-100 transition-all duration-200"
          onClick={() => navigate("/")}
          title="Trang chủ"
        >
          <FaHome className="text-base" />
          <span className="text-sm font-medium">Trang chủ</span>
        </div>

        {/* Nút thông báo */}
        <div
          className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-blue-500 px-2 py-1 rounded hover:bg-gray-100 transition-all duration-200"
          onClick={() => alert("Không có thông báo mới.")}
          title="Thông báo"
        >
          <FaBell className="text-base" />
          <span className="text-sm font-medium">Thông báo</span>
        </div>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="avatar"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white rounded shadow w-40 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                Đăng Xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
