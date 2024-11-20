import avatar from "../../assets/avatar.png";
import "./SideBar.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ user }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar}
        alt={currentUser.name}
      />
      <p className="profile__usename">{user ? user.name : "Guest"}</p>
    </div>
  );
}
export default SideBar;
