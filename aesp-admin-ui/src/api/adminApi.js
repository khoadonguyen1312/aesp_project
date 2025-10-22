const BASE_URL = "http://localhost:8080/api/admin";

export async function getHelloMessage() {
  const response = await fetch(`${BASE_URL}/hello`);
  if (!response.ok) throw new Error("Không thể kết nối backend");
  return response.text();
}
