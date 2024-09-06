import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";

import ItemCard from "../ItemCard/ItemCard.jsx";
import { CurrentTempUnitContext } from "../../Contexts/CurrentTempUnitContext.jsx";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothesItem }) {
  const { currentTempUnit, handleToggleSwitchChange, toConvert } = useContext(
    CurrentTempUnitContext,
  );
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
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
