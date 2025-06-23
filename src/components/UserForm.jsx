import React, { useState } from "react";
import { addUser } from "../api/api";

const UserForm = () => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    addUser({ name, salary: parseFloat(salary) });
    setName("");
    setSalary("");
    alert("Đã thêm nhân viên!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">➕ Thêm nhân viên</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Tên" value={name} onChange={e => setName(e.target.value)} className="border px-3 py-2 w-full" required />
        <input type="number" placeholder="Lương/h" value={salary} onChange={e => setSalary(e.target.value)} className="border px-3 py-2 w-full" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Thêm</button>
      </form>
    </div>
  );
};

export default UserForm;