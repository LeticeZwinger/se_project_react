import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../utils/useForms";

const AddItemModal = ({
  handleAddItem,
  onClose,
  isOpen,
  handleOptionChange,
  closeActiveModal,
}) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    link: "",
    selectedWeather: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetForm = () => {
    setValues({ name: "", link: "", selectedWeather: "" });
  };

  const handleWeatherChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      selectedWeather: e.target.id,
    }));
  };

  const validateForm = () => {
    const isValidName = values.name.trim().length > 0;
    const isValidUrl = values.link.trim().startsWith("http");
    const isValidWeather = values.selectedWeather.length > 0;
    setIsFormValid(isValidName && isValidUrl && isValidWeather);
  };

  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    const data = {
      name: values.name,
      imageURL: values.link,
      selectedWeather: values.selectedWeather,
    };

    if (isFormValid) {
      setLoading(true);
      try {
        await handleAddItem(data);
        handleCloseClick();
      } catch (error) {
        console.error("Failed to add item:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [values]);

  useEffect(() => {
    if (isOpen) {
      handleResetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New Garment"
      buttonText={loading ? "Adding..." : "Add Garment"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitBtn}
      isFormValid={isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image URL
        <input
          type="url"
          className="modal__input"
          placeholder="Image URL"
          id="imageURL"
          name="link"
          value={values.link}
          onChange={handleChange}
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
            checked={values.selectedWeather === "hot"}
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
            checked={values.selectedWeather === "warm"}
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
            checked={values.selectedWeather === "cold"}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
