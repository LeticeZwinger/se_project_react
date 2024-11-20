import { useState, useContext, useEffect } from "react";

import { Modal } from "../Modal/Modal";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { BASE_URL } from "../../utils/auth";
import "./LoginModal.css";
import "../RegisterModal/RegisterModal.css";

function LoginModal({ isOpen, onClose, openSignUpModal }) {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const emailValid = email.includes("@") && email.includes(".");
    const passwordValid = password.trim() !== "";
    setIsValid(emailValid && passwordValid);
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="modal__container_login"
    >
      <h2 className="modal__title">Log In</h2>
      <form className="modal__form" onSubmit={handleSubmit}>
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
        <div className="modal__login">
          <button
            type="submit"
            className={`modal__submit ${
              isValid ? "modal__submit_enabled" : "modal__submit_disabled"
            }`}
            disabled={!isValid}
          >
            Log In
          </button>
          <button className="modal__or-signup-btn" onClick={openSignUpModal}>
            {" "}
            or Sign Up
          </button>
        </div>
        {error && <p className="modal__error">{error}</p>}
      </form>
    </Modal>
  );
}

export default LoginModal;
