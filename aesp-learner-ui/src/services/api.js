// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.94:8080", // IP CỦA BẠN
  timeout: 15000,
});

// TỰ ĐỘNG THÊM TOKEN
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// XỬ LÝ LỖI 401 → TỰ ĐĂNG XUẤT
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      message.error("Phiên đăng nhập hết hạn");
    }
    return Promise.reject(err);
  }
);

export default API;