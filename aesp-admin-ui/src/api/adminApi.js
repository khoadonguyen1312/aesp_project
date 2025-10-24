// src/api/adminApi.js

const BASE_URL = "http://localhost:8080/admin";

//  Hàm kiểm tra kết nối backend
export async function getHelloMessage() {
  try {
    const response = await fetch(`${BASE_URL}/test`);
    if (!response.ok) throw new Error("Không thể kết nối backend");
    return await response.text();
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
}

//  Hàm đăng ký admin mới
export async function registerAdmin(adminData) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) {
      throw new Error("Đăng ký thất bại hoặc tài khoản đã tồn tại");
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    throw error;
  }
}
