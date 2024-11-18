import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

function LoginModal({ isOpen, onClose }) {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://0.0.0.0:3001/signin", {
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
        return fetch("http://0.0.0.0:3001/users/me", {
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
        />
      </label>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
