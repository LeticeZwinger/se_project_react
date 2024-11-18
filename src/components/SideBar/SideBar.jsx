import avatar from "../../assets/avatar.png";
function SideBar({ user }) {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default Avatar" />
      <p className="profile__usename">{user ? user.name : "Guest"}</p>
      <img src={avatar} alt="Terrence Tengegne" className="header__avatar" />
    </div>
  );
}
export default SideBar;
