import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { loginUser, getCurrentUser } from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./LoginModal.css";

function LoginModal({ isOpen, onClose, openSignUpModal }) {
  const { setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailValid = email.includes("@") && email.includes(".");
    const passwordValid = password.trim() !== "";
    setIsFormValid(emailValid && passwordValid);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginData = await loginUser({ email, password });
      const token = loginData.token;
      localStorage.setItem("jwt", token);

      const userData = await getCurrentUser(token);
      setCurrentUser(userData);
      setIsLoggedIn(true);

      onClose();
    } catch (err) {
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText={loading ? "Logging In..." : "Log In"}
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
