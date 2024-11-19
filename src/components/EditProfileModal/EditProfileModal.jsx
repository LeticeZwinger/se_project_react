import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onUpdateProfile }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, avatar });
  };

  if (!isOpen) return null;

  return (
    <div className=" modal">
      <form className="modal__form" onSubmit={handleSubmit}>
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
          Avatar URL:
          <input
            className="modal__input"
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </label>
        <button className="modal__submit" type="submit">
          Save
        </button>
        <button className="modal__submit" type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileModal;
