const BASE_URL = "http://localhost:8080/purchase";

export async function buyCourse(courseId, userId) {
  const res = await fetch(`${BASE_URL}?courseId=${courseId}&userId=${userId}`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Không thể mua khóa học");
  return await res.json();
}
