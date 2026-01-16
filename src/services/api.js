import axios from "axios";

const api = axios.create({
  baseURL: "https://student-management-system-backend-ttkh.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
