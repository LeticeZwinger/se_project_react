import "./ItemCard.css";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { BASE_URL } from "../../utils/auth";

function ItemCard({ item, onCardClick, profile }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [likes, setLikes] = useState(item.likes);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleLike = () => {
    if (isLiked) {
      item.likes = item.likes.filter((id) => id !== currentUser._id);
      console.log(`Item unliked: ${item._id}`);
    } else {
      item.likes.push(currentUser._id);
      console.log(`Item liked: ${item._id}`);
    }

    fetch(`${BASE_URL}/items/${item._id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update like status");
        }
        return res.json();
      })
      .then((updatedItem) => {
        setLikes(updatedItem.likes);
        console.log("Item successfully updated:", updatedItem);
      })
      .catch((err) => console.error(err));
  };

  const itemLikeButton = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {!profile && (
          <button className={itemLikeButton} onClick={handleLike}>
            {isLiked ? "" : ""}
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
