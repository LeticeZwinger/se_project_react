import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { BASE_URL } from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./LoginModal.css";

function LoginModal({ isOpen, onClose, openSignUpModal }) {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const emailValid = email.includes("@") && email.includes(".");
    const passwordValid = password.trim() !== "";
    setIsFormValid(emailValid && passwordValid);
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((data) => {
          throw new Error(data.message);
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
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      errorMessage={error}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </label>
      <button className="modal__or-signup-btn" onClick={openSignUpModal}>
        or Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
