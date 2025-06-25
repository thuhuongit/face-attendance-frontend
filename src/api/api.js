// src/api/api.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Gọi API từ backend
export const fetchAttendance = () => API.get("/attendance/logs");
export const fetchSalary = () => API.get("/report");
export const fetchUsers = () => API.get("/users");
export const addUser = (data) => API.post("/users", data);
