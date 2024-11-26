import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  handleCardClick,
  clothesItems,
  handleAddClick,
  profile = false,
}) {
  return (
    <div>
      <div className="profile__clothes-section">
        <p className="profile__clothes-section-title">Your items</p>
        <button
          className="profile__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items cards__list">
        {clothesItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            profile={profile}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
