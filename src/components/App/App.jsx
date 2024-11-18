import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import {
  filterWeatherData,
  getWeather,
  getItems,
  addItem,
  deleteItem,
} from "../../utils/weatherApi";
import DeleteModal from "../DeleteModal/DeleteModal";
import { coordinates, APIkey } from "../../utils/constants";
import RegisterModal from "../RegisterModal/RegisterModal";
import {
  registerUser,
  loginUser,
  verifyToken,
  updateUserProfile,
} from "../../utils/auth";
import {
  CurrentUserProvider,
  CurrentUserContext,
} from "../../Contexts/CurrentUserContext";

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
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(CurrentUserContext);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      verifyToken(token)
        .then((userData) => {
          console.log("User data:", userData);
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token verification failed:", err);
        });
    }
  }, [setCurrentUser, setIsLoggedIn]);

  const handleRegister = async ({ name, avatar, email, password }) => {
    try {
      const data = await registerUser({ name, avatar, email, password });
      localStorage.setItem("jwt", data.token);
      setCurrentUser(data.user);
      setIsLoggedIn(true);
      setIsRegisterModalOpen(false);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("jwt", data.token);
      setCurrentUser(data.user);
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

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
  const handleUpdateProfile = async (updatedData) => {
    const token = localStorage.getItem("jwt");
    try {
      const updatedUser = await updateUserProfile(token, updatedData);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
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
    <CurrentUserProvider>
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            onRegisterClick={() => setIsRegisterModalOpen(true)}
            onLoginClick={() => setIsLoginModalOpen(true)}
          />

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
            />
            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothesItem}
                    handleAddClick={handleAddClick}
                    onDeleteItem={handleDeleteItem}
                  />
                ) : (
                  <div>Please log in to view this page.</div>
                )
              }
            />
            <Route
              path="/profile"
              element={<Profile handleUpdateProfile={handleUpdateProfile} />}
            />
          </Routes>
        </div>

        {isRegisterModalOpen && (
          <RegisterModal
            onClose={() => setIsRegisterModalOpen(false)}
            onRegisterSuccess={handleRegister}
          />
        )}

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
    </CurrentUserProvider>
  );
}

export default App;
