import { useState, useContext, useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./Profile.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/auth";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleUpdateProfile,
}) {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(CurrentUserContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      fetch(`${BASE_URL}/items?userId=${currentUser._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setClothingItems(data.items))
        .catch((err) => console.error("Failed to fetch user items", err));
    }
  }, [isLoggedIn, currentUser]);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setClothingItems([]);
    navigate("/");
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar user={currentUser} />
        <button className="profile__edit-button" onClick={openEditModal}>
          Change profile data
        </button>
        <button className="profile__sign-out-button" onClick={handleLogout}>
          Sign Out
        </button>
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothesItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}

export default Profile;
