import { BASE_URL } from "./auth";
import { checkResponse } from "./weatherApi";

// something going on with id??
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
export const loginUser = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

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

// something going on with id??
// export const deleteItem = (itemId) => {
//   debugger;
//   return fetch(`${BASE_URL}/${itemId}/items`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//     },
//   }).then(checkResponse);
// };

// something going on with id??

export const updateLikeStatus = (itemId, isLiked) => {
  console.log("itemId being sent:", itemId);

  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};
