import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { BASE_URL } from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, openLoginModal }) {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const emailValid = email.includes("@") && email.includes(".");
    const nameValid = name.trim() !== "";
    const avatarValid = avatar.trim() !== "";
    setIsFormValid(emailValid && nameValid && avatarValid);
  }, [email, name, avatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, avatar, email, password }),
    })
      .then((res) => {
        return res.json().then((data) => {
          if (res.ok) {
            return data;
          } else {
            if (res.status === 409) {
              throw new Error("An account with this email already exists.");
            } else {
              throw new Error(data.message || "Something went wrong.");
            }
          }
        });
      })
      .then(() => {
        return fetch(`${BASE_URL}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
      })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((data) => {
          throw new Error(data.message || "Unable to sign in.");
        });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return fetch(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
      })
      .then((res) => res.json())
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        onClose();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      errorMessage={error}
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
      <button className="modal__or-signin-btn" onClick={openLoginModal}>
        or Log in
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
