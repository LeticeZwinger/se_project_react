export const BASE_URL = "your-base-url-here";

// Helper function to check response
const checkResponse = (res) => {
  if (!res.ok) {
    return res.json().then((err) => {
      throw new Error(err.message || "Something went wrong");
    });
  }
  return res.json();
};

// Fetch all items
export const getItems = () => {
  return fetch(`${BASE_URL}/items`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

// Add a new item
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

// Delete an item
export const deleteItem = (itemId) => {
  return fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
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

// Update like status for an item
export const updateLikeStatus = (itemId, isLiked) => {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};
