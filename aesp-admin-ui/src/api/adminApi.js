// src/api/adminApi.js
const BASE_URL = "http://localhost:8080/admin";

//  Test kết nối backend
export async function getHelloMessage() {
  const response = await fetch(`${BASE_URL}/test`);
  if (!response.ok) throw new Error("Không thể kết nối backend");
  return await response.text();
}

//  Đăng ký admin mới
export async function registerAdmin(adminData) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(adminData),
  });

  const data = await response.json();
  if (!response.ok || data.code !== 200) {
    throw new Error(data.message || "Đăng ký thất bại");
  }
  return data.data; // token JWT trả về từ backend
}

// Lấy thông tin admin (GET /info?id=...)
export async function getAdminInfo(adminId, token) {
  const response = await fetch(`${BASE_URL}/info?id=${adminId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (data.code !== 200) throw new Error(data.message);
  return data.data;
}

// Lấy danh sách user (GET /list-user?page=1&size=10)
export async function getAllUsers(page = 1, size = 10, token) {
  const response = await fetch(`${BASE_URL}/list-user?page=${page}&size=${size}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (data.code !== 200) throw new Error(data.message);
  return data.data;
}

// Xoá user 
export async function deleteUser(id, token) {
  const response = await fetch(`${BASE_URL}/delete-member?id=${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (data.code !== 200) throw new Error(data.message);
  return data.message;
}

// Khoá user 
export async function lockUser(id, token) {
  const response = await fetch(`${BASE_URL}/lock-member?id=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (data.code !== 200) throw new Error(data.message);
  return data.message;
}

// 🔹 Mở khoá user 
export async function unlockUser(id, token) {
  const response = await fetch(`${BASE_URL}/unlock-member?id=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (data.code !== 200) throw new Error(data.message);
  return data.message;
}

// 🔹 Đổi mật khẩu 
export async function updatePassword(id, password, token) {
  const response = await fetch(`${BASE_URL}/update-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, password }),
  });
  const data = await response.json();
  if (data.code !== 200) throw new Error(data.message);
  return data.message;
}

