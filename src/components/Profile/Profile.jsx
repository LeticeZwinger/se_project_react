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
  onLike,
}) {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(CurrentUserContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const navigate = useNavigate();

  const clothesItemsByUserId = clothingItems.filter(
    (item) => item.owner.toString() === currentUser._id.toString(),
  );
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser(null);

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
          clothesItems={clothesItemsByUserId}
          handleAddClick={handleAddClick}
          onLike={onLike}
          profile={true}
        />
      </section>
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={!isEditModalOpen}
          onClose={closeEditModal}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
}

export default Profile;
