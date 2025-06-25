import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [salaryRate, setSalaryRate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", {
        full_name: fullName,
        email,
        password,
        role,
        avatar: "",
        salary_rate: parseFloat(salaryRate)
      }, {
        headers: { "Content-Type": "application/json" }
      });

      alert("✅ Nhân viên đã được thêm!");
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("employee");
      setSalaryRate("");
    } catch (err) {
      console.error(err);
      alert("❌ Thêm thất bại!");
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-4">Thêm nhân viên</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Lương / giờ (VNĐ)"
          value={salaryRate}
          onChange={(e) => setSalaryRate(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-3 py-2 w-full"
        >
          <option value="">-- Chọn vị trí --</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Thêm
        </button>
      </form>
    </div>
  );
};

export default UserForm;
