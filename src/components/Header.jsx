import React, { useContext, useState } from "react";
import { FaExpand } from "react-icons/fa";
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
    <div className="flex justify-between items-center bg-white px-4 py-2 shadow relative">
      {/* Left section - có thể để menu hoặc logo sau này */}
      <div className="flex items-center gap-4"></div>

      {/* Right section */}
      <div className="flex items-center gap-4 relative">
        <img
          src="https://flagcdn.com/w20/vn.png"
          alt="flag"
          className="w-5 h-5 rounded-full cursor-pointer"
        />
        <FaExpand className="text-gray-600 text-lg cursor-pointer" />

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
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                 Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
