import { Modal } from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <Modal
      name="form"
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="modal__container_form"
    >
      <h2 className="modal__title">{title}</h2>
      <form
        action=""
        className="modal__form"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        {children}
        <button type="submit" className="modal__submit">
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
