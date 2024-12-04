import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, onClose, onUpdateProfile }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser]);

  useEffect(() => {
    const isValidName = name.trim().length > 0;
    const isValidAvatar = avatar.trim().startsWith("http");
    setIsFormValid(isValidName && isValidAvatar);
  }, [name, avatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      setLoading(true);
      try {
        await onUpdateProfile({ name, avatar });
        onClose();
      } catch (error) {
        console.error("Failed to update profile:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={loading ? "Saving..." : "Save changes"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      containerClassName="modal__container_edit-profile"
    >
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
    </ModalWithForm>
  );
};

export default EditProfileModal;
