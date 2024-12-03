import { BASE_URL } from "./auth";
import { checkResponse } from "./weatherApi";

// const checkResponse = (res) => {
//   if (!res.ok) {
//     return res.json().then((err) => {
//       throw new Error(err.message || "Something went wrong");
//     });
//   }
//   return res.json();
// };
// this already exist on auth.js / keep there / delete here
// export const registerUser = ({ name, avatar, email, password }) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, avatar, email, password }),
//   }).then(checkResponse);
// };

// this already exist on auth.js / keep there / delete here
export const loginUser = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// move this to auth.js, perhaps (??)
// export const getCurrentUser = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// };

export const getItems = () => {
  return fetch(`${BASE_URL}/items`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

export const addItem = (name, imageURL, weatherType) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, imageURL, weatherType }),
  }).then(checkResponse);
};

export const deleteItem = (itemId) => {
  return fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

// this already exist on auth.js / keep there / delete here
export const updateLikeStatus = (itemId, isLiked) => {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

// handleUpdateProfile={async (updatedData) => {
//     const token = localStorage.getItem("jwt");
//     try {
//       const updatedUser = await updateUserProfile(
//         token,
//         updatedData,
//       );
//       setCurrentUser(updatedUser);
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     }
//   }}
