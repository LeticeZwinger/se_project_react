import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { BASE_URL } from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, openLoginModal }) {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const emailValid = email.includes("@") && email.includes(".");
    const nameValid = name.trim() !== "";
    const avatarValid = avatar.trim() !== "";
    setIsFormValid(emailValid && nameValid && avatarValid);
  }, [email, name, avatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("f");
    setLoading(true);
    try {
      await onRegister({ name, avatar, email, password });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={loading ? "Signing Up..." : "Sign Up"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      containerClassName="modal__container_register"
      alternateButton={
        <button className="modal__or-signin-btn" onClick={openLoginModal}>
          or Log in
        </button>
      }
    >
      <label className="modal__label">
        Email *
        <input
          type="email"
          name="email"
          className="modal__input_signup"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
      </label>
      <label className="modal__label">
        Password *
        <input
          type="password"
          name="password"
          className="modal__input_signup"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </label>
      <label className="modal__label">
        Name *
        <input
          type="text"
          name="name"
          className="modal__input_signup"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name"
        />
      </label>
      <label className="modal__label">
        Avatar URL *
        <input
          type="url"
          name="avatar"
          className="modal__input_signup"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
          placeholder="Avatar URL"
        />
      </label>
      {error}
    </ModalWithForm>
  );
}

export default RegisterModal;
