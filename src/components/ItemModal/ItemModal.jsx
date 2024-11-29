import "./ItemModal.css";
import { Modal } from "../Modal/Modal";

function ItemModal({ activeModal, onClose, deleteItem, card, currentUser }) {
  return (
    <>
      {activeModal === "preview" && (
        <Modal
          name="item"
          isOpen={activeModal === "preview"}
          onClose={onClose}
          containerClassName="modal__container_item"
        >
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

            {currentUser && (
              <button
                onClick={deleteItem}
                type="button"
                className="modal__delete-button"
              >
                Delete item
              </button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default ItemModal;
