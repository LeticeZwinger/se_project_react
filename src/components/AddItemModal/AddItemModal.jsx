import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  handleAddItem,
  handleCloseClick,
  isOpen,
  handleOptionChange,
}) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [selectedWeather, setSelectedWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleURL = (e) => {
    setLink(e.target.value);
  };

  const handleResetForm = () => {
    setName("");
    setLink("");
    setSelectedWeather("");
  };

  const handleWeatherChange = (e) => {
    setSelectedWeather(e.target.id);
    handleOptionChange(e);
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    const data = { name, imageURL: link, selectedWeather };
    handleAddItem(e, data);
  };

  const handleCloseModal = () => {
    handleCloseClick();
  };

  useEffect(() => {
    if (isOpen) {
      handleResetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmitBtn}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image URL
        <input
          type="url"
          className="modal__input"
          placeholder="Image URL"
          id="imageURL"
          value={link}
          onChange={handleURL}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="hot"
            name="weather"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            checked={selectedWeather === "hot"}
          />
          <span>Hot</span>
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            name="weather"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            checked={selectedWeather === "warm"}
          />
          <span>Warm</span>
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="cold"
            name="weather"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            checked={selectedWeather === "cold"}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
