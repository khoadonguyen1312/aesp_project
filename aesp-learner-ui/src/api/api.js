// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // sửa nếu backend port khác
  timeout: 10000,
});

export default API;
