import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./Profile.css";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleUpdateProfile,
  handleLogout,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />

        <button className="profile__edit-button" onClick={openEditModal}>
          Edit Profile
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
