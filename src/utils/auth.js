export const BASE_URL = "http://localhost:3001";
import { checkResponse } from "./weatherApi"; //TO DO

export const getToken = () => localStorage.getItem("jwt"); //TODO pass as function stead of repeat it everytime
export const setToken = (token) => localStorage.setItem("jwt", token);
export const clearToken = () => localStorage.removeItem("jwt");

export const registerUser = async ({ name, avatar, email, password }) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  //import response from WheaterApi.jsx to not duplicate the code
  return checkResponse(response);
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(response);
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(response);
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
// move this to Api.js, perhaps (??)
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
