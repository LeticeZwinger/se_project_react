import { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import LoginModal from "../LoginModal/LoginModal";

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
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      verifyToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token verification failed:", err);
        });
    }
  }, [setCurrentUser, setIsLoggedIn]);

  useEffect(() => {
    getItems()
      .then((items) => setClothesItem(items))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const openLoginModal = () => {
    setActiveModal("log in");
  };

  const openSignUpModal = () => {
    setActiveModal("sign up");
  };

  const handleRegister = async ({ name, avatar, email, password }) => {
    try {
      const data = await registerUser({ name, avatar, email, password });
      localStorage.setItem("jwt", data.token);
      setCurrentUser(data.user);
      setIsLoggedIn(true);
      closeActiveModal();
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
      closeActiveModal();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const currentUserProps = {
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <CurrentUserProvider currentUserProps={currentUserProps}>
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            onLogout={() => {
              localStorage.removeItem("jwt");
              setCurrentUser(null);
              setIsLoggedIn(false);
            }}
            onRegisterClick={openSignUpModal}
            onLoginClick={openLoginModal}
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
                    onDeleteItem={(itemId) => {
                      deleteItem(itemId)
                        .then(() => {
                          setClothesItem((clothesItem) =>
                            clothesItem.filter(
                              (clothes) => clothes._id !== itemId,
                            ),
                          );
                          closeActiveModal();
                        })
                        .catch(console.error);
                    }}
                    handleUpdateProfile={async (updatedData) => {
                      const token = localStorage.getItem("jwt");
                      try {
                        const updatedUser = await updateUserProfile(
                          token,
                          updatedData,
                        );
                        setCurrentUser(updatedUser);
                      } catch (error) {
                        console.error("Failed to update profile:", error);
                      }
                    }}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </div>

        {activeModal === "add-garment" && (
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            handleCloseClick={closeActiveModal}
            handleAddItem={(data) => {
              addItem(data.name, data.imageURL, data.selectedWeather)
                .then((newItem) => {
                  setClothesItem((prevItems) => [newItem, ...prevItems]);
                  closeActiveModal();
                })
                .catch(console.error);
            }}
          />
        )}

        {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            deleteItem={() => setActiveModal("delete")}
            card={selectedCard}
          />
        )}

        {activeModal === "delete" && (
          <DeleteModal
            item={selectedCard._id}
            handleDeleteItem={(itemId) => {
              deleteItem(itemId)
                .then(() => {
                  setClothesItem((clothesItem) =>
                    clothesItem.filter((clothes) => clothes._id !== itemId),
                  );
                  closeActiveModal();
                })
                .catch(console.error);
            }}
            handleDeleteClose={closeActiveModal}
          />
        )}

        {activeModal === "log in" && (
          <LoginModal
            isOpen={activeModal === "log in"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            openSignUpModal={openSignUpModal}
          />
        )}

        {activeModal === "sign up" && (
          <RegisterModal
            isOpen={activeModal === "sign up"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            openLoginModal={openLoginModal}
          />
        )}

        <Footer />
      </div>
    </CurrentUserProvider>
  );
}

export default App;
