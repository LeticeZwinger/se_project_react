import "./ItemModal.css";

function ItemModal({ activeModal, onClose, deleteItem, card }) {
  return (
    <>
      {activeModal === "preview" && (
        <div className="modal modal__opened">
          <div className="modal__content modal__content_type_item">
            <button
              onClick={onClose}
              type="button"
              className="modal__close-button modal__close-button_item"
            ></button>

            <img src={card.imageUrl} alt="card" className="modal__image" />
            <div className="modal__footer">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>

            <button
              onClick={deleteItem}
              type="button"
              className="modal__delete-button"
            >
              Delete item
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemModal;
