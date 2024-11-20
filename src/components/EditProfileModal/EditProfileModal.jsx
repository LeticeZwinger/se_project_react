import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { Modal } from "../Modal/Modal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
const EditProfileModal = ({ isOpen, onClose, onUpdateProfile }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
    }
  }, [isOpen]);
  useEffect(() => {
    const isValidName = name.trim().length > 0;
    const isValidAvatar = avatar.trim().startsWith("http");
    setIsFormValid(isValidName && isValidAvatar);
  }, [name, avatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onUpdateProfile({ name, avatar });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      name="edit profile"
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="modal__container_edit-profile"
    >
      <form className="modal__form" onSubmit={handleSubmit}>
        <label className="modal__title">Change profile data</label>
        <label className="modal__label">
          Name:
          <input
            className="modal__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="modal__label">
          Avatar:
          <input
            className="modal__input"
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </label>
        <button
          className={`modal__profile-submit ${
            isFormValid ? "modal__submit_enabled" : "modal__submit_disabled"
          }`}
          type="submit"
          disabled={!isFormValid}
        >
          Save changes
        </button>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
