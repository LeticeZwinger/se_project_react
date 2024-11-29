import "./ItemCard.css";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { BASE_URL } from "../../utils/auth";

function ItemCard({ item, onCardClick, onLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleLike = () => {
    onLike(item._id, isLiked);
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
        {currentUser && (
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
