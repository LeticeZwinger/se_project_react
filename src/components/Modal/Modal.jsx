import { useEffect } from "react";
import "./Modal.css";

export const Modal = ({
  name,
  onClose,
  children,
  isOpen,
  containerClassName,
  loading,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal__type_${name} ${isOpen ? "modal__opened" : ""}`}
      onClick={handleOverlay}
    >
      <div className={`modal__container ${containerClassName}`}>
        {loading && <div className="modal__loading">Loading...</div>}
        {children}
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
