import { Modal } from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isFormValid,
  containerClassName,
  alternateButton,
}) {
  return (
    <Modal
      name="form"
      isOpen={isOpen}
      onClose={onClose}
      containerClassName={`modal__container_form ${containerClassName}`}
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
        <div className="modal__option-btn">
          <button
            type="submit"
            className={`modal__submit ${
              isFormValid ? "modal__submit_enabled" : "modal__submit_disabled"
            }`}
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
          {alternateButton && (
            <div className="modal__alternate-actions">{alternateButton}</div>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
