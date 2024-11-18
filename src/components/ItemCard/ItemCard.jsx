import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButton = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />

      {isLoggedIn && (
        <button className={itemLikeButton} onClick={handleLike}>
          {isLiked ? "Unlike" : "Like"}
        </button>
      )}
    </li>
  );
}

export default ItemCard;
