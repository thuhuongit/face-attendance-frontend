import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const API_URL = "http://localhost:5000/api/users";

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [salaryRate, setSalaryRate] = useState("");
  const [editingId, setEditingId] = useState(null); 
  const [search, setSearch] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [status, setStatus] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);


  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      full_name: fullName,
      email,
      password,
      role,
      avatar,
      salary_rate: parseFloat(salaryRate),
      employee_code: employeeCode,
      gender,
      dob,
      birth_place: birthPlace,
      status,
    };
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, payload);
      toast.success(" Cập nhật thành công!");
    } else {
      await axios.post(API_URL, payload);
      toast.success(" Nhân viên đã được thêm!");
    }
    setFullName("");
    setEmail("");
    setPassword("");
    setRole("employee");
    setSalaryRate("");
    setEmployeeCode("");
    setGender("");
    setDob("");
    setBirthPlace("");
    setStatus("");
    setEditingId(null);
    fetchUsers();
  } catch (err) {
    console.error(err);
    toast.error(" Thêm hoặc sửa thất bại!");
  }
};
// Hàm upload file lên server
const handleAvatarChange = async (e) => {
  const file = e.target.files[0];
  setAvatarFile(file);
  if (file) {
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const res = await axios.post("http://localhost:5000/api/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAvatar(res.data.url); // url trả về từ backend
      toast.success("Ảnh đã được tải lên!");
    } catch (err) {
      toast.error("Upload ảnh thất bại!");
    }
  }
};

  const handleEdit = (user) => {
  setFullName(user.full_name);
  setEmail(user.email);
  setPassword("");
  setRole(user.role);
  setSalaryRate(user.salary_rate);
  setEmployeeCode(user.employee_code || "");
  setGender(user.gender || "");
  setDob(user.dob || "");
  setBirthPlace(user.birth_place || "");
  setStatus(user.status || "");
  setEditingId(user.id);
};

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Bạn có chắc muốn xoá?",
    text: "Hành động này không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xoá",
    cancelButtonText: "Huỷ",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success(" Xoá nhân viên thành công!");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error(" Xoá thất bại!");
    }
  }
};

// Lọc theo tên 
const filteredUsers = users.filter((user) =>
  user.full_name.toLowerCase().includes(search.toLowerCase())
);


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        {editingId ? " Sửa thông tin nhân viên" : " Thêm nhân viên"}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Mã nhân viên"
          value={employeeCode}
          onChange={(e) => setEmployeeCode(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />
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
          required={!editingId}
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
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        >
          <option value="">-- Chọn giới tính --</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
        <input
          type="date"
          placeholder="Ngày sinh"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Nơi sinh"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Tình trạng"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 w-full"
          required
        />
        <div>
          <label className="block mb-1">Avatar (chọn ảnh):</label>
          <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="border px-3 py-2 w-full"
          />
          {avatar && (
              <img src={avatar} alt="avatar" className="mt-2 h-16 rounded" />
         )}
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-3 py-2 w-full"
        >
          <option value="">-- Chọn vị trí --</option>
          <option value="admin">Admin</option>
          <option value="nhanvien">Nhân viên</option>

        
        </select>
        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded">
          {editingId ? "Cập nhật" : "Thêm"}
        </button>
      </form>


      <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">📋 Danh sách nhân viên</h2>
          <input
               type="text"
               placeholder="Tìm tên nhân viên..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="border px-3 py-2 rounded w-64"
          />
      </div>
      
      <table className="w-full border border-collapse">
        <thead className="bg-gray-300">
          <tr>
            <th className="border px-4 py-2">Tên</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Vai trò</th>
            <th className="border px-4 py-2">Lương/h</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 hover:underline cursor-pointer">
                 <Link 
                    to={`/users/${user.id}`} className="text-blue-600 hover:underline cursor-pointer">{user.full_name}
                 </Link>
              </td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 text-center">{user.role}</td>
              <td className="border px-4 py-2 text-center">{user.salary_rate.toLocaleString()}</td>
              <td className="border px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-800 rounded text-white"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-800 rounded text-white"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserForm;
