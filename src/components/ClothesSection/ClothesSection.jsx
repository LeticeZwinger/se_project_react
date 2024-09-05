import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, clothesItems, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="section__title_btn">
        <p>Your items</p>
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items cards__list">
        {clothesItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
