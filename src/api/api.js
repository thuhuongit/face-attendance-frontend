import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchAttendance = () => API.get("/attendance");
export const fetchSalary = () => API.get("/report");
export const fetchUsers = () => API.get("/users");
export const addUser = (data) => API.post("/users", data);
