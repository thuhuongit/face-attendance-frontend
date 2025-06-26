// src/pages/LoginForm.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      login(res.data.user);
      toast.success("🎉 Đăng nhập thành công!");

      if (res.data.user.role === "admin") {
        navigate("/");
      } else if (res.data.user.role === "nhanvien") {
        navigate("/employee");
      }
    } catch (err) {
      toast.error("❌ Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br to-indigo-600 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md animate-fade-in">
        {/* Logo + Title */}
        <div className="flex items-center justify-center gap-2 text-indigo-700 text-2xl font-bold mb-4">
          <span>Face Attendance</span>
          <span className="bg-indigo-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            PRO
          </span>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Đăng nhập vào hệ thống 
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
              title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              <i className={`fa-solid ${showPassword ? "fa-unlock":"fa-lock"}`}></i>
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition duration-200 font-semibold shadow-md"
          >
             Đăng nhập
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Face Attendance. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
