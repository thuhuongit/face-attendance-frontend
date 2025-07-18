import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Xử lý đổi mật khẩu tại đây
    console.log("Đổi mật khẩu:", form);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md p-8 flex flex-col lg:flex-row gap-6 justify-center">
        {/* Left: User Info */}
        <div className="w-full lg:w-1/3 border rounded-xl p-6 flex flex-col items-center bg-gray-50">
          <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl shadow-md mb-4">
            <FaUserShield />
          </div>
          <h2 className="text-xl font-bold">Admin Account</h2>
          <p className="text-gray-500 mb-4">Quản trị viên</p>
          <table className="text-sm text-left w-full">
            <tbody>
              <tr>
                <td className="font-medium text-gray-600 py-1">Lượt truy cập:</td>
                <td className="py-1">51</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-600 py-1">Ngày tạo:</td>
                <td className="py-1">12/09/2019</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-600 py-1">Ngày sửa:</td>
                <td className="py-1">17/09/2019</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-600 py-1">Trạng thái:</td>
                <td className="py-1">
                  <span className="text-green-600 font-semibold">Đang hoạt động</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right: Change Password Form */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Đổi mật khẩu</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Nhập mật khẩu cũ</label>
              <input
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nhập mật khẩu mới</label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nhập lại mật khẩu mới</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-950 text-white font-semibold px-6 py-2 rounded transition"
            >
              Đặt lại
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
