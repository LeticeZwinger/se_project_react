import React, { useState } from "react";
import { registerUser } from "../../utils/auth";

const RegisterModal = ({ onClose, onRegisterSuccess }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ name, avatar, email, password });
      onRegisterSuccess(data);
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="register-modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default RegisterModal;
