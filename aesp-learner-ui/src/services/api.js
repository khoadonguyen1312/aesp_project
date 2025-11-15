// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // IP CỦA BẠN
  timeout: 15000,
});

// TỰ ĐỘNG THÊM TOKEN
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log(axios.getUri)
    console.log(token)
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// XỬ LÝ LỖI 401 → TỰ ĐĂNG XUẤT
API.interceptors.response.use(
  (res) => {
    console.log(res.data.code)
    return res;
  },
  (err) => {
    console.log(err.data)
    if (err.data===un) {
      localStorage.clear();
      window.location.href = "/login";
      message.error("Phiên đăng nhập hết hạn");
    }
    return Promise.reject(err);
  }
);

export default API;