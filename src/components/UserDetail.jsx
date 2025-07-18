import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaUserCircle, FaBirthdayCake, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaUniversity, FaBriefcase, FaFlag, FaVenusMars, FaCalendarAlt
} from "react-icons/fa";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-600">⏳ Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Cột trái: thông tin chi tiết */}
      <div className="w-full lg:w-2/3 p-10 bg-white shadow-xl rounded-r-3xl">
        <div className="flex items-center gap-4 mb-8">
          <FaUserCircle className="text-6xl text-blue-500" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Thông tin nhân viên</h2>
            <p className="text-gray-600 text-sm">👤 Mã nhân viên: {user.employee_code}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-gray-800">
          <InfoItem icon={<FaUserCircle />} label="Họ tên" value={user.full_name} />
          <InfoItem icon={<FaVenusMars />} label="Giới tính" value={user.gender} />
          <InfoItem icon={<FaBirthdayCake />} label="Ngày sinh" value={user.birth_date} />
          <InfoItem icon={<FaPhone />} label="Số điện thoại" value={user.phone} />
          <InfoItem icon={<FaEnvelope />} label="Email" value={user.email} />
          <InfoItem icon={<FaMapMarkerAlt />} label="Địa chỉ" value={user.address} />
          <InfoItem icon={<FaCalendarAlt />} label="Ngày vào làm" value={user.join_date} />
          <InfoItem icon={<FaUniversity />} label="Trình độ" value={user.education} />
          <InfoItem icon={<FaBriefcase />} label="Chuyên ngành" value={user.major} />
          <InfoItem icon={<FaFlag />} label="Quốc tịch" value={user.nationality} />
          <InfoItem icon={<FaFlag />} label="Tôn giáo" value={user.religion || "Không"} />
          <InfoItem icon={<FaMapMarkerAlt />} label="Hộ khẩu" value={user.permanent_residence} />
          <InfoItem icon={<FaMapMarkerAlt />} label="Tạm trú" value={user.temporary_residence} />
          <InfoItem icon={<FaBriefcase />} label="Loại nhân viên" value={user.employee_type} />
          <InfoItem icon={<FaBriefcase />} label="Chức vụ" value={user.position} />
          <InfoItem icon={<FaUniversity />} label="Phòng ban" value={user.department} />
          <InfoItem icon={<FaFlag />} label="Trạng thái" value={user.status} />
        </div>
      </div>

      {/* Cột phải: mở rộng để ảnh hoặc gì đó */}
      <div className="hidden lg:flex w-1/3 bg-blue-100 justify-center items-center rounded-l-3xl">
        <img
          src="/avatar-placeholder.png"
          alt="Avatar"
          className="w-2/3 rounded-full border-4 border-white shadow-lg"
        />
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-blue-600 text-lg mt-1">{icon}</div>
    <span><strong>{label}:</strong> {value}</span>
  </div>
);

export default UserDetail;
