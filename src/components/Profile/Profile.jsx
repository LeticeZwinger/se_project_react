import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ handleCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothesItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}
export default Profile;
