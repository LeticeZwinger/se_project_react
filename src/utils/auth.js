export const BASE_URL = "http://0.0.0.0:3001";

export const registerUser = async ({ name, avatar, email, password }) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  if (!response.ok) {
    throw new Error("Failed to register user");
  }
  return response.json();
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  return response.json();
};

export const verifyToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to verify token");
  }
  return response.json();
};

export const updateUserProfile = async (token, { name, avatar }) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
};
