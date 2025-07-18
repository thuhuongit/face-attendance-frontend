import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaUserCircle, FaBirthdayCake, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaUniversity, FaBriefcase, FaFlag, FaVenusMars, FaCalendarAlt, FaIdBadge, FaMoneyBill
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col lg:flex-row items-center justify-center">
        {/* Left: Avatar + Basic Info */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <img
            src={user.avatar || "/avatar-placeholder.png"}
            alt="Avatar"
            className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.full_name}</h2>
          <p className="text-gray-500 font-medium">
            <FaIdBadge className="inline mr-2" />
            Mã NV: {user.employee_code}
          </p>
        </div>

        {/* Center: Logo */}
        <div className="hidden lg:flex justify-center items-center w-1/3">
          <img src="/logo_codedoan.png" alt="Logo" className="max-w-[180px]" />
        </div>

        {/* Right: Detail Info */}
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0 grid grid-cols-1 gap-3 text-gray-700">
          <InfoItem icon={<FaVenusMars />} label="Giới tính" value={user.gender} />
          <InfoItem icon={<FaBirthdayCake />} label="Ngày sinh" value={user.dob} />
          <InfoItem icon={<FaPhone />} label="Số điện thoại" value={user.phone} />
          <InfoItem icon={<FaEnvelope />} label="Email" value={user.email} />
          <InfoItem icon={<FaMapMarkerAlt />} label="Nơi sinh" value={user.birth_place} />
          <InfoItem icon={<FaUniversity />} label="Trình độ học vấn" value={user.education_level} />
          <InfoItem icon={<FaBriefcase />} label="Chức vụ" value={user.position} />
          <InfoItem icon={<FaMoneyBill />} label="Lương/giờ" value={user.salary_rate?.toLocaleString() + " VNĐ"} />
          <InfoItem icon={<FaFlag />} label="Tình trạng" value={
            <span className={`font-bold px-2 py-1 rounded ${user.status === "Đang làm việc" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {user.status}
            </span>
          } />
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 text-sm">
    <div className="text-blue-600 text-base">{icon}</div>
    <span className="font-medium w-32">{label}:</span>
    <span className="text-gray-800">{value || <span className="italic text-gray-400">Chưa có</span>}</span>
  </div>
);

export default UserDetail;
