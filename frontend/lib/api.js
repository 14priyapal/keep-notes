const BASE_URL = "http://localhost:5000/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

export const getNotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const data = await handleResponse(response);
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch notes:", error.message);
    return [];
  }
};

export const createNote = async (note) => {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return handleResponse(response);
};

export const updateNote = async (id, note) => {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return handleResponse(response);
};

export const deleteNote = async (id) => {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
