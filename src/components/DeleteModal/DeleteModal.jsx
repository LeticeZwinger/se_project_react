import "./DeleteModal.css";

function DeleteModal({ item, handleDeleteItem, handleDeleteClose }) {
  const deleteCard = () => {
    handleDeleteItem(item);
    handleDeleteClose();
  };

  return (
    <div className="modal modal__opened ">
      <div className="modal__container ">
        <p className="modal__delete-question">
          Are you sure you want to delete this item?
          <br /> This action is irreversible.
        </p>
        <button
          onClick={handleDeleteClose}
          type="button"
          className="modal__close-delete-button"
        ></button>

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
      </div>
    </div>
  );
}

export default DeleteModal;
