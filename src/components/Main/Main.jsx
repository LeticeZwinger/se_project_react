import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { CurrentTempUnitContext } from "../../Contexts/CurrentTempUnitContext.jsx";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext.jsx";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothesItem, onLike }) {
  const { currentTempUnit, toConvert } = useContext(CurrentTempUnitContext);
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(CurrentUserContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {toConvert(weatherData.temp.F)} &deg; {currentTempUnit} / You
          may want to wear:
        </p>
        <ul className="cards__list">
          {clothesItem
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onLike={onLike}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
