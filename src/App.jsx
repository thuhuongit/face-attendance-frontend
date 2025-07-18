// src/App.jsx
import React, { useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import AttendanceTable from "./components/AttendanceTable";
import SalaryTable from "./components/SalaryTable";
import UserForm from "./components/UserForm";
import UserDetail from "./components/UserDetail"; // Nếu cần
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const [view, setView] = useState("dashboard");
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onNavigate={setView} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<AttendanceTable />} />
            <Route path="/salary" element={<SalaryTable />} />
            <Route
              path="/users"
              element={
                user.role === "admin" ? (
                  <UserForm />
                ) : (
                  <div className="text-red-500 font-semibold text-center mt-10">
                    Bạn không có quyền truy cập trang này.
                  </div>
                )
              }
            />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;