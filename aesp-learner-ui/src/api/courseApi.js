const BASE_URL = "http://localhost:8080/course";

export async function getCourses() {
  const res = await fetch(`${BASE_URL}/list`);
  const data = await res.json();
  if (data.code !== 200) throw new Error(data.message);
  return data.data;
}

export async function createCourse(course, token) {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(course),
  });
  const data = await res.json();
  if (data.code !== 200) throw new Error(data.message);
  return data.data;
}

export async function deleteCourse(id, token) {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (data.code !== 200) throw new Error(data.message);
  return data.message;
}

