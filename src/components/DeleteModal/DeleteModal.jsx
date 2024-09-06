import "./DeleteModal.css";
import { Modal } from "../Modal/Modal";

function DeleteModal({ item, handleDeleteItem, handleDeleteClose, isOpen }) {
  const deleteCard = () => {
    handleDeleteItem(item);
  };

  return (
    <Modal
      name="delete"
      isOpen={isOpen}
      onClose={handleDeleteClose}
      containerClassName="modal__container_delete"
    >
      <p className="modal__delete-question">
        Are you sure you want to delete this item?
        <br /> This action is irreversible.
      </p>
      <button
        type="submit"
        className="modal__delete-confirmation"
        onClick={deleteCard}
      >
        Yes, delete item
      </button>
      <button
        type="button"
        className="modal__delete-cancel"
        onClick={handleDeleteClose}
      >
        Cancel
      </button>
    </Modal>
  );
}

export default DeleteModal;
