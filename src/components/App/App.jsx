import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { CurrentTempUnitContext } from "../../Contexts/CurrentTempUnitContext";
import {
  filterWeatherData,
  getWeather,
  getItems,
  addItem,
  deleteItem,
} from "../../utils/weatherApi";
import DeleteModal from "../DeleteModal/DeleteModal";

import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    location: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothesItem, setClothesItem] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    getItems()
      .then((items) => setClothesItem(items))
      .catch(console.error);
  }, []);

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        console.log("Deleted item with ID: " + itemId);

        setClothesItem((clothesItem) =>
          clothesItem.filter((clothes) => clothes._id !== itemId),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const openDeleteModal = () => {
    setActiveModal("delete");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItem = (data) => {
    addItem(data.name, data.imageURL, data.selectedWeather)
      .then((newItem) => {
        console.log(newItem);
        setClothesItem((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                handleCardClick={handleCardClick}
                clothesItem={clothesItem}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                handleCardClick={handleCardClick}
                clothingItems={clothesItem}
                handleAddClick={handleAddClick}
                onDeleteItem={handleDeleteItem}
              />
            }
          ></Route>
        </Routes>
      </div>

      {activeModal === "add-garment" && (
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          handleCloseClick={closeActiveModal}
          handleAddItem={handleAddItem}
          handleOptionChange={handleOptionChange}
        />
      )}

      {activeModal === "preview" && (
        <ItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          deleteItem={openDeleteModal}
          card={selectedCard}
        />
      )}

      {activeModal === "delete" && (
        <DeleteModal
          item={selectedCard._id}
          handleDeleteItem={handleDeleteItem}
          handleDeleteClose={closeActiveModal}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
