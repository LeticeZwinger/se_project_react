import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../utils/useForms";

const AddItemModal = ({
  handleAddItem,
  handleCloseClick,
  isOpen,
  handleOptionChange,
}) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    link: "",
    selectedWeather: "",
  });

  const handleResetForm = () => {
    setValues({ name: "", link: "", selectedWeather: "" });
  };

  const handleWeatherChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      selectedWeather: e.target.id,
    }));
    handleOptionChange(e);
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    const data = {
      name: values.name,
      imageURL: values.link,
      selectedWeather: values.selectedWeather,
    };
    handleAddItem(data);
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
      onClose={handleCloseClick}
      onSubmit={handleSubmitBtn}
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
