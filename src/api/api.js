// src/api/api.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// API gọi tới backend
export const fetchAttendance = () => API.get("/attendance/logs");
export const fetchSalary = () => API.get("/report");
export const fetchUsers = () => API.get("/users");
export const addUser = (data) => API.post("/users", data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
