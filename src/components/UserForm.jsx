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
  const [phone, setPhone] = useState("");
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
        phone,
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
      setPhone("");
      setAvatar("");
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
        setAvatar(res.data.url); 
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
    setPhone(user.phone);
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
        Thêm nhân viên mới
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="space-y-4">
          <label className="block mb-1">Mã nhân viên :</label>
          <input
            type="text"
            placeholder="Mã nhân viên"
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
            className="border px-3 py-2 w-full"
            required
          />
          <label className="block mb-1">Họ và tên :</label>
          <input
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border px-3 py-2 w-full"
            required
          />
          <label className="block mb-1">Email :</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 w-full"
            required
          />
          <label className="block mb-1">Mật khẩu :</label>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 w-full"
            required={!editingId}
          />
          <label className="block mb-1">Số điện thoại :</label>
          <input
            type="phone"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border px-3 py-2 w-full"
            required={!editingId}
          />
          <label className="block mb-1">Lương / giờ (VNĐ) :</label>
          <input
            type="number"
            placeholder="Lương / giờ (VNĐ)"
            value={salaryRate}
            onChange={(e) => setSalaryRate(e.target.value)}
            className="border px-3 py-2 w-full"
            required
          />
        </div>

        <div className="space-y-4">
          <label className="block mb-1">Giới tính :</label>
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
          <label className="block mb-1">Ngày sinh :</label>
          <input
            type="date"
            placeholder="Ngày sinh"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border px-3 py-2 w-full"
            required
          />
          <label className="block mb-1">Nơi sinh :</label>
          <input
            type="text"
            placeholder="Nơi sinh"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            className="border px-3 py-2 w-full"
            required
          />
          <label className="block mb-1">Tình trạng :</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 w-full"
            required
          >
            <option value="">-- Chọn tình trạng --</option>
            <option value="Đang làm việc">Đang làm việc</option>
            <option value="Đã nghỉ việc">Đã nghỉ việc</option>
          </select>

          <label className="block mb-1">Chọn vị trí :</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border px-3 py-2 w-full"
          >
            <option value="">-- Chọn vị trí --</option>
            <option value="admin">Admin</option>
            <option value="nhanvien">Nhân viên</option>
          </select>

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
        </div>

        <div className="col-span-1 md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded"
          >
            Thêm nhân viên mới
          </button>
        </div>
      </form>

    </div>
  );
};

export default UserForm;
