import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaUserCircle, FaBirthdayCake, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaUniversity, FaBriefcase, FaFlag, FaVenusMars, FaIdBadge, FaMoneyBill
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
        <div className="text-xl font-semibold text-gray-600">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br via-white to-blue-50 py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="flex flex-col xl:flex-row gap-12 p-10 xl:p-16">
          {/* Avatar + Basic Info */}
          <div className="flex flex-col items-center xl:items-start xl:w-1/3">
            <img
              src={user.avatar || "/avatar-placeholder.png"}
              alt="Avatar"
              className="w-48 h-48 rounded-full border-4 border-blue-500 object-cover shadow-lg mb-6"
            />
            <h2 className="text-3xl font-extrabold text-gray-800">{user.full_name}</h2>
            <div className="mt-2 text-gray-600 text-lg flex items-center gap-2">
              <FaIdBadge className="text-blue-400" />
              <span className="font-semibold">Mã NV: {user.employee_code}</span>
            </div>
            <div className="mt-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm">
              {user.position || "Chức vụ chưa cập nhật"}
            </div>
          </div>

          {/* Info List */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 text-base text-gray-800">
            <InfoItem icon={<FaVenusMars />} label="Giới tính" value={user.gender} />
            <InfoItem icon={<FaBirthdayCake />} label="Ngày sinh" value={user.dob} />
            <InfoItem icon={<FaPhone />} label="Số điện thoại" value={user.phone} />
            <InfoItem icon={<FaEnvelope />} label="Email" value={user.email} />
            <InfoItem icon={<FaMapMarkerAlt />} label="Nơi sinh" value={user.birth_place} />
            <InfoItem icon={<FaUniversity />} label="Trình độ học vấn" value={user.education_level} />
            <InfoItem icon={<FaMoneyBill />} label="Lương/giờ" value={
              user.salary_rate
                ? `${user.salary_rate.toLocaleString()} VNĐ`
                : "Chưa có"
            } />
            <InfoItem icon={<FaFlag />} label="Tình trạng" value={
              <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                user.status === "Đang làm việc"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {user.status}
              </span>
            } />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="text-blue-600 mt-1 text-xl">{icon}</div>
    <div>
      <div className="text-gray-500 font-semibold">{label}</div>
      <div className="text-gray-900">
        {value || <span className="italic text-gray-400">Chưa có</span>}
      </div>
    </div>
  </div>
);

export default UserDetail;
