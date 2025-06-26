import React, { useState, useContext } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import AttendanceTable from "./components/AttendanceTable";
import SalaryTable from "./components/SalaryTable";
import UserForm from "./components/UserForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

const App = () => {
  const [view, setView] = useState("dashboard");
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const renderView = () => {
    switch (view) {
      case "attendance": return <AttendanceTable />;
      case "salary": return <SalaryTable />;
      case "users":
        return user.role === "admin" ? (
          <UserForm />
        ) : (
          <div className="text-red-500 font-semibold text-center mt-10">
            Bạn không có quyền truy cập trang này.
          </div>
        );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar onNavigate={setView} />
      <div className="flex-1">
        <Header />
        <div className="p-6 bg-gray-100 min-h-screen">
          {renderView()}
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;
