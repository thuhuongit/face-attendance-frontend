import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import AttendanceTable from "./components/AttendanceTable";
import SalaryTable from "./components/SalaryTable";
import UserForm from "./components/UserForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [view, setView] = useState("dashboard");

  const renderView = () => {
    switch (view) {
      case "attendance": return <AttendanceTable />;
      case "salary": return <SalaryTable />;
      case "users": return <UserForm />;
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

        {/*  Hiển thị thông báo Toast ở góc phải trên */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;
