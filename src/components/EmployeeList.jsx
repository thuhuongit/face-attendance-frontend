import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/users"; // hoặc endpoint Flask của bạn

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filteredEmployees = employees.filter((emp) =>
  emp.full_name.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    setEmployees(response.data); // Sửa lại dòng này
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhân viên:", error);
    toast.error("Không thể tải danh sách nhân viên!");
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



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold"> Danh sách nhân viên</h2>
          <input
               type="text"
               placeholder="Tìm tên nhân viên..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="border px-3 py-2 rounded w-64"
          />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="py-2 px-4 border">STT</th>
              <th className="py-2 px-4 border">Mã Nhân Viên</th>
              <th className="py-2 px-4 border">Họ và Tên</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Giới Tính</th>
              <th className="py-2 px-4 border">Ngày sinh</th>
              <th className="py-2 px-4 border">Nơi sinh</th>
              <th className="py-2 px-4 border">Tình trạng</th>
              <th className="py-2 px-4 border">Chức vụ</th>
              <th className="py-2 px-4 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">Không có dữ liệu</td>
              </tr>
            ) : (
              filteredEmployees.map((emp, index) => (
                <tr key={emp.id} className="text-slate-700 hover:bg-slate-50">
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border text-center">{emp.employee_code}</td>
                  <td className="py-2 px-4 border text-center">{emp.full_name}</td>
                  <td className="py-2 px-4 border text-center">{emp.email}</td>
                  <td className="py-2 px-4 border text-center">{emp.gender}</td>
                  <td className="py-2 px-4 border text-center">{emp.dob}</td>
                  <td className="py-2 px-4 border text-center">{emp.birth_place}</td>
                  <td className="py-2 px-4 border text-center">
                     <span
                       className={`font-bold px-2 py-1 rounded 
                           ${emp.status === "Đang làm việc"
                               ? "bg-green-100 text-green-800"
                               : "bg-red-100 text-red-800"}`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">{emp.role || "Nhân viên"}</td>
                  <td className="py-2 px-4 border text-center space-x-2">
                <button
                      onClick={() => navigate(`/users/${emp.id}`)}
                      className="px-2 py-1 bg-green-600 hover:bg-green-800 rounded text-white"
                    >
                      <i className="fa-solid fa-eye"></i> Xem
                </button>

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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
