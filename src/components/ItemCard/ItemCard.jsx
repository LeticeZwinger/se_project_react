import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

function ItemCard({ item, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButtonClassName = `item__like-button ${
    isLiked ? "item__like-button_active" : ""
  }`;

  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <img src={item.imageUrl} alt={item.name} />

      {isLoggedIn && (
        <button className={itemLikeButtonClassName} onClick={handleLike}>
          {isLiked ? "Unlike" : "Like"}
        </button>
      )}
    </div>
  );
}

export default ItemCard;
