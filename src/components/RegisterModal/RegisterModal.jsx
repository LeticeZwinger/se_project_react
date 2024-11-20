import { Modal } from "../Modal/Modal";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import "./RegisterModal.css";
import "../RegisterModal/RegisterModal.css";

function RegisterModal({ isOpen, onClose }) {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const emailValid = email.includes("@") && email.includes(".");
    const nameValid = name.trim() !== "";
    const avatarValid = avatar.trim() !== "";
    setIsValid(emailValid && nameValid && avatarValid);
  }, [email, name, avatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    fetch("http://0.0.0.0:3001/signup", {
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
        return fetch("http://0.0.0.0:3001/signin", {
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
    <Modal
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      containerClassName="modal__container-signup"
    >
      <h2 className="modal__title">Sign Up</h2>
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
      <div className="modal__signup">
        <button
          type="submit"
          className={`modal__submit ${
            isValid ? "modal__submit_enabled" : "modal__submit_disabled"
          }`}
          disabled={!isValid}
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        {/* todo pass ONCLICk */}
        <button className="modal__or-signin-btn">or sign in</button>
      </div>

      {error && <p className="modal__error">{error}</p>}
    </Modal>
  );
}

export default RegisterModal;
