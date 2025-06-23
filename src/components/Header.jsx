import React from "react";
import { FaBars, FaBell, FaCommentDots, FaSearch, FaExpand } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-white px-4 py-2 shadow">
      {/* Left: menu + search */}
      <div className="flex items-center gap-4">
        <FaBars className="text-xl cursor-pointer" />

        {/* Search box */}
        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-40"
          />
          <FaSearch className="text-gray-500 ml-2" />
        </div>
      </div>

      {/* Right: notifications, language, user */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <FaBell className="text-gray-600 text-lg cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">4</span>
        </div>
        <img
          src="https://flagcdn.com/w20/vn.png"
          alt="flag"
          className="w-5 h-5 rounded-full cursor-pointer"
        />
        <FaExpand className="text-gray-600 text-lg cursor-pointer" />
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="avatar"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
