// src/api/courseApi.js
import API from "../services/api"; // axios instance chung
import { message } from "antd";

// Base URL backend (thay 8080 nếu cần)
const COURSE_API = "/course"; // API đã có baseURL → chỉ cần path

// Helper: xử lý lỗi chung
const handleError = (err, fallbackMessage) => {
  console.error("Course API Error:", err);
  const msg = err.response?.data?.message || err.message || fallbackMessage;
  message.error(msg);
  throw new Error(msg);
};

// Lấy danh sách khóa học (ai cũng xem được)
export const getCourses = async () => {
  try {
    const res = await API.get(`${COURSE_API}/list`);
    if (res.data.code !== 200) {
      throw new Error(res.data.message || "Lấy danh sách khóa học thất bại");
    }
    return res.data.data || [];
  } catch (err) {
    // Nếu backend chưa chạy → trả mock để frontend vẫn hiển thị
    console.warn("Backend chưa chạy → dùng dữ liệu mẫu");
    return [
      {
        id: 1,
        title: "Tiếng Anh Giao Tiếp Cơ Bản",
        price: 799000,
        originalPrice: 1599000,
        instructor: "Cô Lan Anh",
        thumbnailUrl: "",
        isHot: true,
      },
      {
        id: 2,
        title: "Luyện Thi IELTS 7.0+",
        price: 1299000,
        originalPrice: 2599000,
        instructor: "Thầy Minh",
        thumbnailUrl: "",
        isNew: true,
      },
      {
        id: 3,
        title: "Tiếng Anh Trẻ Em 6-11 Tuổi",
        price: 599000,
        instructor: "Cô Mai",
        thumbnailUrl: "",
      },
    ];
  }
};

// Tạo khóa học mới (chỉ admin/mentor)
export const createCourse = async (courseData, token) => {
  try {
    const res = await API.post(`${COURSE_API}/create`, courseData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.code !== 200) throw new Error(res.data.message);
    message.success("Tạo khóa học thành công!");
    return res.data.data;
  } catch (err) {
    handleError(err, "Tạo khóa học thất bại");
  }
};

// Xóa khóa học (admin/mentor)
export const deleteCourse = async (id, token) => {
  try {
    const res = await API.delete(`${COURSE_API}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.code !== 200) throw new Error(res.data.message);
    message.success("Xóa khóa học thành công!");
    return res.data.message;
  } catch (err) {
    handleError(err, "Xóa khóa học thất bại");
  }
};

// (Tùy chọn) Cập nhật khóa học
export const updateCourse = async (id, courseData, token) => {
  try {
    const res = await API.put(`${COURSE_API}/update/${id}`, courseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.code !== 200) throw new Error(res.data.message);
    message.success("Cập nhật thành công!");
    return res.data.data;
  } catch (err) {
    handleError(err, "Cập nhật thất bại");
  }
};

