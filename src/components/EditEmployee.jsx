import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/users";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "employee",
    salary_rate: "",
    employee_code: "",
    gender: "",
    dob: "",
    birth_place: "",
    status: "",
    avatar: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/${id}`)
        .then((res) => setUserData(res.data))
        .catch(() => toast.error("Không tìm thấy nhân viên"));
    }
  }, [id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
        setUserData({ ...userData, avatar: res.data.url });
        toast.success("Ảnh đã được tải lên!");
      } catch {
        toast.error("Upload ảnh thất bại!");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, {
        ...userData,
        salary_rate: parseFloat(userData.salary_rate),
      });
      toast.success("Cập nhật thành công!");
      navigate("/"); // Chuyển về trang danh sách nếu muốn
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Sửa thông tin nhân viên</h1>

      <div className="bg-white min-h-screen w-full p-8 rounded-2xl shadow-xl">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="space-y-4">
          <label className="block mb-1">Mã nhân viên :</label>
          <input
            type="text"
            name="employee_code"
            value={userData.employee_code}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />
          <label className="block mb-1">Họ và tên :</label>
          <input
            type="text"
            name="full_name"
            value={userData.full_name}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />
          <label className="block mb-1">Email :</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />
          <label className="block mb-1">Số điện thoại :</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />
          <label className="block mb-1">Lương / giờ (VNĐ) :</label>
          <input
            type="number"
            name="salary_rate"
            value={userData.salary_rate}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />
        </div>

        <div className="space-y-4">
          <label className="block mb-1">Giới tính :</label>
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
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
            name="dob"
            value={userData.dob?.substring(0, 10) || ""}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />

          <label className="block mb-1">Nơi sinh :</label>
          <input
            type="text"
            name="birth_place"
            value={userData.birth_place}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />

          <label className="block mb-1">Tình trạng :</label>
          <input
            type="text"
            name="status"
            value={userData.status}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
            required
          />

          <div>
            <label className="block mb-1">Avatar:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="border px-3 py-2 w-full"
            />
            {userData.avatar && (
              <img src={userData.avatar} alt="avatar" className="mt-2 h-16 rounded" />
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded"
          >
            Cập nhật nhân viên
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditUser;
