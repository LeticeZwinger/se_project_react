import { useState } from "react";
import "./DeleteModal.css";
import { Modal } from "../Modal/Modal";

function DeleteModal({ item, handleDeleteItem, handleDeleteClose, isOpen }) {
  const [loading, setLoading] = useState(false);
  const deleteCard = async () => {
    setLoading(true);
    try {
      await handleDeleteItem(item);
      handleDeleteClose();
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
      >
        {loading ? "Deleting..." : "Yes, delete item"}
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
