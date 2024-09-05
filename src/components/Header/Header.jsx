import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick }, weatherData) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>

      <p className="header__date-location">
        {" "}
        {currentDate}, {weatherData.location}
      </p>
      <div className="header__right-section">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">Terrence Tengegne</p>
            <img
              src={avatar}
              alt="Terrence Tengegne"
              className="header__avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
